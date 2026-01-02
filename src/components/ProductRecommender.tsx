import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { ChevronRight, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/supabase';

interface ProductRecommenderProps {
  products: Product[];
}

type Question = {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    tags: string[];
  }[];
};

const questions: Question[] = [
  {
    id: 'usage',
    question: 'What will you primarily use it for?',
    options: [
      { value: 'gaming', label: 'Gaming & Streaming', tags: ['headphones', 'high-performance'] },
      { value: 'work', label: 'Work & Productivity', tags: ['laptop', 'headphones'] },
      { value: 'travel', label: 'Travel & Commuting', tags: ['headphones', 'portable'] },
      { value: 'fitness', label: 'Fitness & Sports', tags: ['headphones', 'portable'] },
      { value: 'creative', label: 'Creative Work', tags: ['laptop', 'headphones', 'premium'] },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget range?',
    options: [
      { value: 'entry', label: 'Under $100', tags: ['accessories'] },
      { value: 'mid', label: '$100 - $600', tags: ['headphones'] },
      { value: 'premium', label: '$600+', tags: ['laptop', 'premium'] },
    ],
  },
  {
    id: 'features',
    question: 'Which feature matters most?',
    options: [
      { value: 'anc', label: 'Noise Cancellation', tags: ['headphones', 'premium'] },
      { value: 'battery', label: 'Long Battery Life', tags: ['headphones'] },
      { value: 'portability', label: 'Portability', tags: ['portable', 'accessories'] },
      { value: 'performance', label: 'Maximum Performance', tags: ['laptop', 'premium'] },
      { value: 'customization', label: 'Customization', tags: ['accessories', 'headphones'] },
    ],
  },
];

export const ProductRecommender = ({ products }: ProductRecommenderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleAnswer = (value: string) => {
    setSelectedOption(value);
    
    // Small delay for visual feedback
    setTimeout(() => {
      const newAnswers = { ...answers, [questions[currentStep].id]: value };
      setAnswers(newAnswers);
      
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption('');
      } else {
        setShowResults(true);
      }
    }, 200);
  };

  const getRecommendedProducts = () => {
    const allTags: string[] = [];
    
    // Collect all tags from selected answers
    questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer) {
        const option = q.options.find(opt => opt.value === answer);
        if (option) {
          allTags.push(...option.tags);
        }
      }
    });

    // Score products based on tag matches and price range
    const scoredProducts = products.map(product => {
      let score = 0;
      const productTags: string[] = [];
      
      // Tag products based on characteristics
      if (product.price > 500) productTags.push('premium', 'laptop');
      if (product.price > 400 && product.price < 700) productTags.push('headphones');
      if (product.price < 100) productTags.push('accessories', 'portable');
      if (product.title.toLowerCase().includes('headphone')) productTags.push('headphones', 'premium');
      if (product.title.toLowerCase().includes('laptop')) productTags.push('laptop', 'premium', 'high-performance');
      if (product.title.toLowerCase().includes('cable') || product.title.toLowerCase().includes('case') || product.title.toLowerCase().includes('pad')) {
        productTags.push('accessories', 'portable', 'customization');
      }

      // Calculate score based on tag matches
      allTags.forEach(tag => {
        if (productTags.includes(tag)) score += 1;
      });

      // Boost featured products slightly
      if ((product as any).featured) score += 0.5;

      return { product, score };
    });

    // Sort by score and return top 3
    return scoredProducts
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(p => p.product);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setSelectedOption('');
  };

  const recommendedProducts = showResults ? getRecommendedProducts() : [];

  if (showResults) {
    return (
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="font-mono text-xs text-primary tracking-widest">YOUR PERFECT MATCH</p>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            Recommended For You
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Based on your preferences, we suggest these products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">No products match your criteria yet.</p>
              <Button onClick={resetQuiz} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button 
            onClick={resetQuiz}
            variant="outline"
            className="font-mono text-xs tracking-widest"
          >
            START OVER
          </Button>
        </div>
      </section>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="font-mono text-xs text-primary tracking-widest">PRODUCT FINDER</p>
        </div>
        <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
          Find Your Perfect Match
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          Answer a few questions and we'll recommend the best products for you
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-muted-foreground tracking-widest">
            QUESTION {currentStep + 1} OF {questions.length}
          </span>
          <span className="font-mono text-xs text-primary tracking-widest">
            {Math.round(((currentStep + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="glass p-8 mb-8 border-white/10">
        <h3 className="text-3xl font-bold mb-8 text-center">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`
                w-full p-4 rounded-lg border transition-all duration-300
                flex items-center justify-between group
                ${selectedOption === option.value 
                  ? 'border-primary bg-primary/10 scale-[0.98]' 
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                }
              `}
            >
              <span className="font-medium text-left">{option.label}</span>
              <ChevronRight className={`
                h-5 w-5 transition-all duration-300
                ${selectedOption === option.value 
                  ? 'text-primary translate-x-1' 
                  : 'text-muted-foreground group-hover:text-foreground group-hover:translate-x-1'
                }
              `} />
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      {currentStep > 0 && (
        <div className="text-center">
          <Button 
            onClick={() => {
              setCurrentStep(currentStep - 1);
              const newAnswers = { ...answers };
              delete newAnswers[currentQuestion.id];
              setAnswers(newAnswers);
            }}
            variant="ghost"
            className="font-mono text-xs tracking-widest"
          >
            ← BACK
          </Button>
        </div>
      )}
    </section>
  );
};