import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Music, 
  Heart, 
  MapPin, 
  Book, 
  Sparkles, 
  Award,
  Calendar,
  Leaf,
  Star,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { getCulturalFactOfDay, getRandomProverb, getFestivalOfMonth, getRandomQuizQuestion } from '../data/odishaCultural';
import odishaCulturalData from '../data/odishaCultural';

// Main Cultural Widgets Container
const CulturalWidgets = ({ showAll = false, maxWidgets = 3 }) => {
  const widgets = [
    <OdissiDanceWidget key="odissi" />,
    <TraditionalFoodWidget key="food" />,
    <WildlifeFactWidget key="wildlife" />,
    <LiteratureWidget key="literature" />,
    <FestivalWidget key="festival" />,
    <HandicraftWidget key="handicraft" />,
    <CulturalQuizWidget key="quiz" />
  ];

  const displayWidgets = showAll ? widgets : widgets.slice(0, maxWidgets);

  return (
    <div className={`grid gap-4 ${showAll ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-3'}`}>
      {displayWidgets}
    </div>
  );
};

// Odissi Dance Widget
const OdissiDanceWidget = () => {
  const { t } = useTranslation();
  const [currentPose, setCurrentPose] = useState(0);
  const poses = odishaCulturalData.arts.odissiDance.poses;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPose((prev) => (prev + 1) % poses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [poses.length]);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 border border-pink-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-pink-800 flex items-center">
          <Music size={18} className="mr-2" />
          🎭 {t('odissi_dance')}
        </h4>
        <div className="animate-pulse text-pink-600">
          <Sparkles size={16} />
        </div>
      </div>
      
      <div className="text-center mb-3">
        <div className="text-4xl mb-2 animate-bounce">💃</div>
        <p className="text-sm font-medium text-pink-700">{poses[currentPose]}</p>
      </div>
      
      <div className="text-xs text-pink-600 bg-pink-100 rounded p-2">
        <strong>{t('did_you_know')}</strong> {t('odissi_dance')} is over 2000 years old and was performed by Maharis in temples.
      </div>
      
      <div className="flex justify-center mt-2 space-x-1">
        {poses.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentPose ? 'bg-pink-600' : 'bg-pink-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Traditional Food Widget
const TraditionalFoodWidget = () => {
  const { t } = useTranslation();
  const [currentFood, setCurrentFood] = useState(0);
  const foods = odishaCulturalData.food.traditional;

  const nextFood = () => setCurrentFood((prev) => (prev + 1) % foods.length);
  const prevFood = () => setCurrentFood((prev) => (prev - 1 + foods.length) % foods.length);

  const food = foods[currentFood];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-orange-800 flex items-center">
          <Heart size={18} className="mr-2" />
          🍛 {t('traditional_food')}
        </h4>
        <div className="flex space-x-1">
          <button onClick={prevFood} className="text-orange-600 hover:text-orange-800">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextFood} className="text-orange-600 hover:text-orange-800">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-center mb-3">
        <h5 className="font-medium text-orange-800 mb-1">{food.name}</h5>
        <p className="text-sm text-orange-600 odia-text mb-2">{food.odia}</p>
        <p className="text-xs text-orange-700">{food.description}</p>
      </div>
      
      {food.giTag && (
        <div className="text-xs bg-green-100 text-green-800 rounded p-2 mb-2">
          🏆 <strong>GI Tag:</strong> {food.giTag}
        </div>
      )}
      
      <div className="text-xs text-orange-600 bg-orange-100 rounded p-2">
        <strong>Special:</strong> {food.significance || food.speciality}
      </div>
    </div>
  );
};

// Wildlife & Nature Widget
const WildlifeFactWidget = () => {
  const { t } = useTranslation();
  const [currentSpot, setCurrentSpot] = useState(0);
  const wildlife = odishaCulturalData.nature.wildlife;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpot((prev) => (prev + 1) % wildlife.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [wildlife.length]);

  const spot = wildlife[currentSpot];

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-green-800 flex items-center">
          <Leaf size={18} className="mr-2" />
          🌿 {t('nature_wildlife')}
        </h4>
        <div className="text-green-600">
          <MapPin size={16} />
        </div>
      </div>
      
      <div className="mb-3">
        <h5 className="font-medium text-green-800 mb-1">{spot.name}</h5>
        <p className="text-xs text-green-600 mb-2">{spot.location || spot.type}</p>
        
        {spot.uniqueFeature && (
          <div className="text-xs bg-green-100 text-green-800 rounded p-2 mb-2">
            ⭐ <strong>Unique:</strong> {spot.uniqueFeature}
          </div>
        )}
        
        {spot.species && (
          <div className="text-xs text-green-700">
            <strong>Species:</strong> {spot.species.slice(0, 2).join(', ')}
            {spot.species.length > 2 && ` +${spot.species.length - 2} more`}
          </div>
        )}
      </div>
    </div>
  );
};

// Literature & Proverbs Widget
const LiteratureWidget = () => {
  const { t } = useTranslation();
  const [currentProverb, setCurrentProverb] = useState(null);

  useEffect(() => {
    setCurrentProverb(getRandomProverb());
    const interval = setInterval(() => {
      setCurrentProverb(getRandomProverb());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!currentProverb) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-blue-800 flex items-center">
          <Book size={18} className="mr-2" />
          📜 {t('odia_wisdom')}
        </h4>
        <div className="text-blue-600">
          <Star size={16} />
        </div>
      </div>
      
      <div className="text-center mb-3">
        <p className="text-sm font-medium odia-text text-blue-800 mb-2">
          "{currentProverb.odia}"
        </p>
        <p className="text-xs italic text-blue-600 mb-2">
          "{currentProverb.english}"
        </p>
      </div>
      
      <div className="text-xs text-blue-700 bg-blue-100 rounded p-2">
        <strong>Context:</strong> {currentProverb.context}
      </div>
    </div>
  );
};

// Festival Widget
const FestivalWidget = () => {
  const { t } = useTranslation();
  const currentMonth = new Date().getMonth() + 1;
  const festival = getFestivalOfMonth(currentMonth);
  const festivalData = odishaCulturalData.festivals.find(f => f.name === festival);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-purple-800 flex items-center">
          <Calendar size={18} className="mr-2" />
          🎉 {t('festival_season')}
        </h4>
        <div className="text-purple-600">
          <Sparkles size={16} />
        </div>
      </div>
      
      <div className="text-center mb-3">
        <h5 className="font-medium text-purple-800 mb-1">{festival}</h5>
        {festivalData?.odia && (
          <p className="text-sm text-purple-600 odia-text mb-2">{festivalData.odia}</p>
        )}
        {festivalData?.significance && (
          <p className="text-xs text-purple-700">{festivalData.significance}</p>
        )}
      </div>
      
      <div className="text-xs text-purple-600 bg-purple-100 rounded p-2">
        <strong>This month:</strong> Celebrate {festival} with traditional fervor!
      </div>
    </div>
  );
};

// Handicraft Widget
const HandicraftWidget = () => {
  const { t } = useTranslation();
  const [currentCraft, setCurrentCraft] = useState(0);
  const crafts = Object.values(odishaCulturalData.arts.handicrafts);

  const nextCraft = () => setCurrentCraft((prev) => (prev + 1) % crafts.length);

  const craft = crafts[currentCraft];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-amber-800 flex items-center">
          <Award size={18} className="mr-2" />
          🎨 {t('handicrafts')}
        </h4>
        <button onClick={nextCraft} className="text-amber-600 hover:text-amber-800">
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="mb-3">
        <h5 className="font-medium text-amber-800 mb-1">
          {craft.location ? `${craft.location} ` : ''}
          {Object.keys(odishaCulturalData.arts.handicrafts)[currentCraft].replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </h5>
        <p className="text-xs text-amber-700 mb-2">{craft.description}</p>
        
        {craft.facts && (
          <div className="text-xs text-amber-600 bg-amber-100 rounded p-2">
            💡 {craft.facts[0]}
          </div>
        )}
      </div>
    </div>
  );
};

// Cultural Quiz Widget
const CulturalQuizWidget = () => {
  const { t } = useTranslation();
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setQuestion(getRandomQuizQuestion());
  }, []);

  const handleShowAnswer = () => setShowAnswer(!showAnswer);

  const getNewQuestion = () => {
    setQuestion(getRandomQuizQuestion());
    setShowAnswer(false);
  };

  if (!question) return null;

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-teal-800 flex items-center">
          <Info size={18} className="mr-2" />
          🧠 {t('cultural_quiz')}
        </h4>
        <button onClick={getNewQuestion} className="text-teal-600 hover:text-teal-800 text-xs">
          New Q
        </button>
      </div>
      
      <div className="mb-3">
        <p className="text-sm font-medium text-teal-800 mb-2">{question.question}</p>
        
        {!showAnswer ? (
          <div className="space-y-1">
            {question.options.map((option, index) => (
              <div key={index} className="text-xs bg-teal-50 p-2 rounded cursor-pointer hover:bg-teal-100">
                {String.fromCharCode(65 + index)}. {option}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs bg-green-100 text-green-800 p-2 rounded">
            <strong>Answer:</strong> {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
          </div>
        )}
      </div>
      
      <button
        onClick={handleShowAnswer}
        className="w-full text-xs bg-teal-100 text-teal-800 py-2 rounded hover:bg-teal-200"
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
    </div>
  );
};

// Daily Cultural Fact Widget
const DailyCulturalFactWidget = () => {
  const { t } = useTranslation();
  const factOfDay = getCulturalFactOfDay();

  return (
    <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg p-4 border border-rose-200">
      <div className="flex items-center mb-3">
        <h4 className="font-semibold text-rose-800 flex items-center">
          <Sparkles size={18} className="mr-2" />
          💡 {t('daily_cultural_fact')}
        </h4>
      </div>
      
      <div className="text-sm text-rose-700 bg-rose-100 rounded p-3">
        {factOfDay}
      </div>
      
      <div className="text-xs text-rose-600 mt-2 text-center">
        🏛️ Pride of Odisha • Learning with Culture
      </div>
    </div>
  );
};

// Export components
export {
  CulturalWidgets,
  OdissiDanceWidget,
  TraditionalFoodWidget,
  WildlifeFactWidget,
  LiteratureWidget,
  FestivalWidget,
  HandicraftWidget,
  CulturalQuizWidget,
  DailyCulturalFactWidget
};

export default CulturalWidgets;