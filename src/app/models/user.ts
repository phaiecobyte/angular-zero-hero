export class User {
    id: number;
    name: string;
    gender: string;
    membership: string;
    price: number;
    isActive: boolean;

    constructor(id?: number, name?: string, gender?: string, membership?: string, price?: number, isActive?: boolean){
        this.id = id || 0;
        this.name = name || '';
        this.gender = gender || '';
        this.membership = membership || '';
        this.price = price || 0;
        this.isActive = isActive || false;
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getGender(): string {
        return this.gender;
    }

    getMembership(): string {
        return this.membership;
    }

    getPrice(): number {
        return this.price;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setGender(gender: string): void {
        this.gender = gender;
    }

    setMembership(membership: string): void {
        this.membership = membership;
    }

    setPrice(price: number): void {
        this.price = price;
    }

    setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }
    
}
