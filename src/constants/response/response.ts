export interface Response<T> {
  status: responseType;
  status_code: number;
  message: string;
  result?: T;
}

export type responseType = "SUCCESS" | "ERROR";
