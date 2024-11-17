import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, allbanks, getBenefits } from "../../api/app/app.js";
import { UserProfile } from "../model/UserProfile.ts";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [allBanks, setAllBanks] = useState([]);

  const [benefits, setBenefits] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [refreshBenefits, setRefreshBenefits] = useState(false);
  const onLogout = useCallback(async () => {
    try {
      await logout();

      localStorage.removeItem("profile");
      localStorage.removeItem("allBanks");
      // localStorage.clear();

      setProfile(undefined);

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [navigate]);

  const onLogin = (data) => {
    const profile = UserProfile.jsonToModel(data?.user_info);

    if (data?.user_info?.role === 0) {
      return;
    }

    localStorage.setItem("profile", JSON.stringify(profile));
    setProfile(profile);
    navigate("/");
  };

  const updateProfile = (newProfileData) => {
    localStorage.removeItem("profile");

    const profile = UserProfile.jsonToModel(newProfileData);

    localStorage.setItem("profile", JSON.stringify(profile));

    setProfile(profile);
  };

  const getAllBanks = async () => {
    try {
      const response = await allbanks();
      localStorage.setItem("allBanks", JSON.stringify(response.data));
      setAllBanks(response.data);
    } catch (error) {
      console.error("Error fetching bank names:", error);
    }
  };

  const getAllBenefits = async () => {
    try {
      const response = await getBenefits();

      setBenefits(response.data);
    } catch (error) {}
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, " ");
  };
  const handleSelectBenefitsChange = (value) => {
    const standardizedBenefits = value.map((input) => {
      const normalizedInput = normalizeText(input);

      const existingBenefit = benefits.find(
        (benefit) => normalizeText(benefit.name) === normalizedInput
      );

      return existingBenefit ? existingBenefit.name : input.trim();
    });
    const uniqueBenefits = [...new Set(standardizedBenefits)];

    setSelectedBenefits(uniqueBenefits);
  };

  useEffect(() => {
    const profileData = localStorage.getItem("profile");
    getAllBenefits();
    if (!!profileData) {
      const profile = UserProfile.jsonToModel(JSON.parse(profileData));
      setProfile(profile);
      getAllBanks();
    } else {
      const queryParams = new URLSearchParams(location.search);
      const identifier = queryParams.get("identifier");

      if (location.pathname === "/register") {
        navigate("/register");
      } else if (location.pathname === "/receive-code") {
        navigate("/receive-code");
      } else if (location.pathname === "/confirm-code") {
        if (identifier) {
          navigate(
            `/confirm-code?identifier=${encodeURIComponent(identifier)}`
          );
        }
      } else if (location.pathname === "/reset-password") {
        if (identifier) {
          navigate(
            `/reset-password?identifier=${encodeURIComponent(identifier)}`
          );
        }
      } else {
        navigate("/login");
      }
    }
    setLoading(false);
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (refreshBenefits) {
      getAllBenefits();
      setRefreshBenefits(false);
    }
  }, [refreshBenefits]);
  const isAuthenticated = () => {
    return !!profile;
  };

  return (
    <AuthContext.Provider
      value={{
        updateProfile,
        isAuthenticated,
        onLogin,
        loading,
        onLogout,
        profile,
        benefits,
        selectedBenefits,
        handleSelectBenefitsChange,
        allBanks,
        setRefreshBenefits,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
