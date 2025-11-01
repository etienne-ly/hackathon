import {ComponentRef} from '@angular/core';

export interface UserInfo {
  address: string;
  email: string;
  nas: number;
}

export interface CompletionState {
  orderedPizzas: boolean;
  driversLicense: boolean;
  classChoice: boolean;
}

export enum AdvertisementSide {
  Left, Right, Bottom
}

export interface AdvertisementData {
  id: number;
  imageSrc: string;
  side: AdvertisementSide;
}

export interface Sender {
  name: string;
  email: string;
  DateSend: string;
  TimeSend: string;
}

export interface Email {
  id: number;
  subject: string;
  sender: Sender;
  read: boolean;
  important: boolean;
  content: string;
}

export interface Tab {
  title: string;
  url: string;
  componentRef: ComponentRef<any>;
}

export interface DormState {
  vpnUsed: boolean;
  modemWorking: boolean;
  fixing: boolean;
}

export interface PageContent {
  title: string;
  mainContent: string;
  image: string;
  action: string;
  footer: string;
}

export interface WebPage {
  template: 'news' | 'forum' | 'e-commerce' | 'business';
  domain: string;
  title: string;
  description: string;
  url: string;
}

export interface Popup {
  visible: boolean;
  url: string;
  title: string;
  actions: { name: string, action: Function }[];
}
