export interface DbService {
  get(params: any): Promise<any>;
  put(params: any): Promise<any>;
  query(params: any): Promise<any>;
  scan(params: any): Promise<any>;
}
