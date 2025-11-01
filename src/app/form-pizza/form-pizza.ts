import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

@Component({
  selector: 'app-form-pizza',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-pizza.html',
  styleUrl: './form-pizza.css',
})
export class FormPizza {
  formData: FormData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  };

  // MVP mock data for auto-completion (Figma-style)
  private mockData: FormData = {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    postalCode: '10001',
    cardNumber: '4532 1234 5678 9010',
    cardName: 'JOHN DOE',
    expiryDate: '12/25',
    cvv: '123'
  };

  isAutoFilling = false;

  handleFocus(fieldName: keyof FormData): void {
    this.isAutoFilling = true;
    setTimeout(() => {
      this.formData[fieldName] = this.mockData[fieldName];
      setTimeout(() => {
        this.isAutoFilling = false;
      }, 300);
    }, 50);
  }

  handleSubmit(): void {
    console.log('Form submitted:', this.formData);
    const allFieldsFilled = Object.values(this.formData).every(
      value => value.trim() !== ''
    );
    if (allFieldsFilled) {
      alert('Order placed! (MVP Demo)\n\nOrder details:\n' + JSON.stringify(this.formData, null, 2));
    } else {
      alert('Please fill in all required fields');
    }
  }
}
