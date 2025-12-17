import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Implement newsletter subscription
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary-600 to-primary-700 text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/7031601/pexels-photo-7031601.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Newsletter background"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-600/90 to-primary-700/90"></div>
      </div>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pattern-dots text-white z-10"></div>

      <div className="container-custom relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
            Get expert tips, special offers, and the latest tradespeople updates delivered to your inbox
          </p>
          
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-xl animate-scale-in">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-medium whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
          )}
          
          <p className="text-sm text-primary-foreground/70 mt-4">
            Join 2,000+ homeowners who get monthly tips. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
