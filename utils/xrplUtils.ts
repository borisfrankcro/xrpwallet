
import { Wallet, Client, dropsToXrp } from 'xrpl';

export interface XRPWallet {
  address: string;
  seed: string;
  publicKey: string;
  privateKey: string;
}

export interface AccountInfo {
  address: string;
  balance: string;
  sequence: number;
  exists: boolean;
  reserve: string;
}

export class XRPLService {
  private client: Client;
  private isConnected: boolean = false;

  constructor() {
    // Using public XRPL testnet server
    this.client = new Client('wss://s.altnet.rippletest.net:51233');
  }

  async connect(): Promise<void> {
    try {
      if (!this.isConnected) {
        await this.client.connect();
        this.isConnected = true;
        console.log('Connected to XRPL');
      }
    } catch (error) {
      console.error('Failed to connect to XRPL:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.isConnected) {
        await this.client.disconnect();
        this.isConnected = false;
        console.log('Disconnected from XRPL');
      }
    } catch (error) {
      console.error('Failed to disconnect from XRPL:', error);
    }
  }

  generateWallet(): XRPWallet {
    try {
      const wallet = Wallet.generate();
      console.log('Generated new XRP wallet:', wallet.address);
      
      return {
        address: wallet.address,
        seed: wallet.seed!,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
      };
    } catch (error) {
      console.error('Failed to generate wallet:', error);
      throw error;
    }
  }

  async validateAndGetAccountInfo(address: string): Promise<AccountInfo> {
    try {
      await this.connect();
      
      const accountInfo = await this.client.request({
        command: 'account_info',
        account: address,
        ledger_index: 'validated'
      });

      const balance = dropsToXrp(accountInfo.result.account_data.Balance);
      
      return {
        address,
        balance,
        sequence: accountInfo.result.account_data.Sequence,
        exists: true,
        reserve: '20', // Standard XRP reserve requirement
      };
    } catch (error: any) {
      console.log('Account validation error:', error.data?.error || error.message);
      
      // If account doesn't exist, return default info
      if (error.data?.error === 'actNotFound') {
        return {
          address,
          balance: '0',
          sequence: 0,
          exists: false,
          reserve: '20',
        };
      }
      
      throw error;
    }
  }

  async getAccountBalance(address: string): Promise<string> {
    try {
      const accountInfo = await this.validateAndGetAccountInfo(address);
      return accountInfo.balance;
    } catch (error) {
      console.error('Failed to get account balance:', error);
      throw error;
    }
  }

  isValidAddress(address: string): boolean {
    try {
      // Basic XRP address validation
      return address.length >= 25 && address.length <= 34 && address.startsWith('r');
    } catch (error) {
      console.error('Address validation error:', error);
      return false;
    }
  }
}

export const xrplService = new XRPLService();
