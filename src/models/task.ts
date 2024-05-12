export interface getTask {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in progress" | "completed";
  created_at: Date;
}

export interface postTask {
  id?: number;
  title: string;
  description?: string;
  status: string;
  created_at?: string;
}

export interface getSummary {
  status: "pending" | "in progress" | "completed";
  count: number;
}
