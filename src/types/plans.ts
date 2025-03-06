export interface PlanFeature {
  name: string;
  description: string;
  included: boolean;
  creditCost?: number; // Only for free plan features that consume credits
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: PlanFeature[];
  creditAllowance?: number; // Only for free plan
  creditRefreshPeriod?: 'daily' | 'weekly' | 'monthly'; // Only for free plan
}

export const FREE_PLAN_CREDITS = 100;
export const CREDIT_REFRESH_PERIOD = 'monthly';

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingPeriod: 'monthly',
    creditAllowance: FREE_PLAN_CREDITS,
    creditRefreshPeriod: CREDIT_REFRESH_PERIOD,
    features: [
      {
        name: 'Basic Note Taking',
        description: 'Create and edit study notes',
        included: true,
        creditCost: 1
      },
      {
        name: 'Task Management',
        description: 'Create and manage study tasks',
        included: true,
        creditCost: 1
      },
      {
        name: 'Calendar View',
        description: 'View and manage study schedule',
        included: true,
        creditCost: 2
      },
      {
        name: 'Real-time Progress Tracking',
        description: 'Track your study progress in real-time',
        included: false
      },
      {
        name: 'AI Note Scheduler',
        description: 'Smart scheduling of study sessions',
        included: false
      },
      {
        name: 'Advanced Analytics',
        description: 'In-depth analysis of study patterns',
        included: false
      }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    billingPeriod: 'monthly',
    features: [
      {
        name: 'Basic Note Taking',
        description: 'Create and edit study notes',
        included: true
      },
      {
        name: 'Task Management',
        description: 'Create and manage study tasks',
        included: true
      },
      {
        name: 'Calendar View',
        description: 'View and manage study schedule',
        included: true
      },
      {
        name: 'Real-time Progress Tracking',
        description: 'Track your study progress in real-time',
        included: true
      },
      {
        name: 'AI Note Scheduler',
        description: 'Smart scheduling of study sessions',
        included: true
      },
      {
        name: 'Advanced Analytics',
        description: 'Basic analysis of study patterns',
        included: false
      }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    billingPeriod: 'monthly',
    features: [
      {
        name: 'Basic Note Taking',
        description: 'Create and edit study notes',
        included: true
      },
      {
        name: 'Task Management',
        description: 'Create and manage study tasks',
        included: true
      },
      {
        name: 'Calendar View',
        description: 'View and manage study schedule',
        included: true
      },
      {
        name: 'Real-time Progress Tracking',
        description: 'Track your study progress in real-time',
        included: true
      },
      {
        name: 'AI Note Scheduler',
        description: 'Smart scheduling of study sessions',
        included: true
      },
      {
        name: 'Advanced Analytics',
        description: 'In-depth analysis of study patterns',
        included: true
      }
    ]
  }
];