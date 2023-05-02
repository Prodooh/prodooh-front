import { PayloadPereferences } from "./payload-preferences";

export interface User {
    "id": number; 
    "registry_id": number; 
    "admin_registry_id": number; 
    "name": string; 
    "surnames": string; 
    "email": string;
    "payload": PayloadPereferences;
}
