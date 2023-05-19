import { PayloadPereferences } from "./payload-preferences";

export interface User {
    "id": number; 
    "registry_id": number; 
    "admin_registry_id": number;
    "company_id": number;
    "country_id": number;
    "image": string; 
    "name": string; 
    "surnames": string; 
    "email": string;
    "roles": any;
    "payload": PayloadPereferences;
}
