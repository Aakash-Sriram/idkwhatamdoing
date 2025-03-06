import { Check, X } from 'lucide-react';
import { PLANS } from '../types/plans';

export default function PricingPlans() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Start with our free plan and upgrade anytime for advanced features
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm ${plan.id === 'premium' ? 'ring-2 ring-blue-600' : ''}`}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400">/{plan.billingPeriod}</span>
              </div>
              {plan.creditAllowance && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {plan.creditAllowance} credits/{plan.creditRefreshPeriod}
                </div>
              )}
            </div>

            <div className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <div key={feature.name} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{feature.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                    {feature.creditCost && (
                      <span className="inline-block mt-1 text-xs text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40 px-2 py-1 rounded">
                        {feature.creditCost} credits per use
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`mt-8 w-full py-3 px-4 rounded-lg font-medium ${plan.id === 'free' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {plan.id === 'free' ? 'Get Started' : 'Upgrade Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}