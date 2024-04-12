export interface IResponse {
    URL: string;
    answer: string;
    billable_cost: number;
    category: string;
    confidence: number;
    continue: boolean;
    error: boolean;
    error_msg: string;
    failover: number;
    question: string;
    search_details: string;
    state: string;
    terminate: string;
}
