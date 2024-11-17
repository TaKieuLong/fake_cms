enum UserRole {
  SuperAdmin = 1,
  Admin = 2,
  Receptionist = 3,
}

export interface Data {
  access_token: string;
  refresh_token: string;
  user_info: UserProfile;
}

export class UserProfile {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  phone: string;
  avatar: string;
  status: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  banks: any;
  gender: number | null;
  dateOfBirth: string | null


  update(props: Partial<UserProfile>) {
    Object.assign(this, props);
  }

  isInternalUser(): boolean {
    return this.role === UserRole.SuperAdmin || this.role === UserRole.Admin;
  }

  canManageRooms(): boolean {
    return this.isInternalUser();
  }

  canChangeRoomStatus(): boolean {
    return (
      this.role === UserRole.SuperAdmin || this.role === UserRole.Receptionist
    );
  }

  canViewBookableRoom(): boolean {
    return this.role === UserRole.Receptionist;
  }

  canViewPaymentInfo(): boolean {
    return this.canViewBookableRoom();
  }

  canViewBookedRooms(): boolean {
    return this.role === UserRole.Receptionist || this.role === UserRole.Admin;
  }

  isAdmin(): boolean {
    return this.role === UserRole.Admin;
  }

  isReceptionist(): boolean {
    return this.role === UserRole.Receptionist;
  }

  isSuperAdmin(): boolean {
    return this.role === UserRole.SuperAdmin;
  }

  static jsonToModel(json: any): UserProfile {
    const model = new UserProfile();
    model.id = json.id ?? 0;
    model.name = json.name ?? "";
    model.email = json.email ?? "";
    model.phone = json.phone ?? "";
    model.avatar = json.avatar ?? "";
    model.verified = json.verified ?? false;
    model.status = json.status ?? false;

    model.role =
      UserRole[json.role as keyof typeof UserRole] ?? UserRole.SuperAdmin;

    model.createdAt = json.createdAt ? new Date(json.createdAt) : new Date();
    model.updatedAt = json.updatedAt ? new Date(json.updatedAt) : new Date();
    model.banks = json.banks ?? [];
    model.gender = json.gender !== undefined ? json.gender : model.gender; // Chấp nhận null
    model.dateOfBirth =
      json.dateOfBirth !== undefined ? json.dateOfBirth : model.dateOfBirth; // Chấp nhận null

    return model;
  }
}
