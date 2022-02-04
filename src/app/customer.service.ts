import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Customer } from "./customer";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class CustomerService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.apiServerUrl}/customer/all`);
    }

    public addCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${this.apiServerUrl}/customer/add`, customer);
    }

    public updateCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(`${this.apiServerUrl}/customer/update`, customer);
    }
    
    public deleteCustomer(customerId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/customer/delete/${customerId}`);
    }
}

