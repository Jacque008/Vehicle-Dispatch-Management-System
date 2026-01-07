export enum AssignmentStatus {
  DRAFT = 'draft',
  DISPATCHED = 'dispatched',
  FILLED = 'filled',
  CANCELLED = 'cancelled',
}

export enum ResponseType {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  NO_RESPONSE = 'no_response',
}

export interface Assignment {
  id: string;
  managerId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  status: AssignmentStatus;
  selectedDriverId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DispatchResponse {
  id: string;
  assignmentId: string;
  driverId: string;
  response: ResponseType;
  respondedAt?: Date;
  createdAt: Date;
}

export interface CreateAssignmentInput {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
}
