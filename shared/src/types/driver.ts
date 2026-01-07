export enum DriverStatus {
  APPLIED = 'applied',
  TESTED = 'tested',
  QUALIFIED = 'qualified',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface Driver {
  id: string;
  email: string;
  phone: string;
  name: string;
  licenseNumber?: string;
  status: DriverStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterDriverInput {
  email: string;
  phone: string;
  name: string;
}

export interface UpdateDriverInput {
  name?: string;
  licenseNumber?: string;
}
