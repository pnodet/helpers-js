export function getResponse(response: any): any;
export function processJSON(jsonObject: any): void;
export function writeServer(action: any, data?: {}): {
    method: any;
    headers: {
        'Content-Type': string;
    };
    body: string;
};
