export interface TaskBaseRequest {
  genreId: number;
  name: string;
  status: number;
}

export interface TaskCreateRequest extends TaskBaseRequest {}

export interface TaskUpdateRequest extends TaskBaseRequest {
  id: number;
}

export interface TaskDeleteRequest {
  id: number;
}
