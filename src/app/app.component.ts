import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public customers: Customer[] = [];
  public editCustomer: Customer;
  public deleteCustomer: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  public getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (response: Customer[]) => {
        this.customers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddCustomer(addForm: NgForm): void {
    document.getElementById('add-customer-form').click();
    this.customerService.addCustomer(addForm.value).subscribe(
      (response: Customer) => {
        console.log(response);
        this.getCustomers();
        addForm.reset();
        alert("Customer Added Successfully");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCustomer(customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe(
      (response: Customer) => {
        console.log(response);
        this.getCustomers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCustomers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCustomers(key: string): void {
    console.log(key);
    const results: Customer[] = [];
    for (const customer of this.customers) {
      if (customer.fname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || customer.emailaddresses.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || customer.category.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || customer.city.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || customer.country.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(customer);
      }
    }
    this.customers = results;
    if (results.length === 0 || !key) {
      this.getCustomers();
    }
  }

  public onOpenModal(customer: Customer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCustomerModal');
    }
    if (mode === 'edit') {
      this.editCustomer = customer;
      button.setAttribute('data-target', '#updateCustomerModal');
    }
    if (mode === 'delete') {
      this.deleteCustomer = customer;
      button.setAttribute('data-target', '#deleteCustomerModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
function swal(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}

