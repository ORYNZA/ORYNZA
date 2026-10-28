import React, { useState } from 'react';
import { INVITATION_DESIGNS } from '../../data/designs';

const QUESTIONS = [
  {
    id: 'vibe',
    question: '1. What is the atmosphere of your celebration?',
    subtitle: 'Choose the visual mood that resonates most with your wedding vision.',
    options: [
      { label: 'Royal Heritage Palace & Destination Luxury', designId: 'royal-lake-palace', icon: '🏛️' },
      { label: 'Lush Garden Lawn & Open-Air Vows', designId: 'botanical-sage', icon: '🌿' },
      { label: 'Romantic Pastel Sangeet & Florals', designId: 'blush-romance', icon: '🌸' },
      { label: 'Sleek Contemporary & Pure Editorial', designId: 'modern-minimal', icon: '📐' },
      { label: 'Auspicious Heritage & Mandap Rituals', designId: 'traditional-indian', icon: '🪔' },
      { label: 'Black-Tie Twilight Reception & Gala', designId: 'evening-reception', icon: '✨' },
    ],
  },
  {
    id: 'palette',
    question: '2. Which color harmony feels right for you?',
    subtitle: 'The shades that will weave through your digital stationery suite.',
    options: [
      { label: 'Udaipur Blush, Champagne & Antique Gold', designId: 'royal-lake-palace', icon: '🟡' },
      { label: 'Eucalyptus, Sage & Soft Foliage Greens', designId: 'botanical-sage', icon: '🟢' },
      { label: 'Soft Dusty Rose, Coral & Tender Blush', designId: 'blush-romance', icon: '🌸' },
      { label: 'Porcelain White, Ink Black & Slate', designId: 'modern-minimal', icon: '⚪' },
      { label: 'Auspicious Saffron, Marigold & Deep Red', designId: 'traditional-indian', icon: '🟠' },
      { label: 'Velvet Charcoal, Plum & Starlit Gold', designId: 'evening-reception', icon: '🟣' },
    ],
  },
  {
    id: 'scale',
    question: '3. What scale of ceremonies are you celebrating?',
    subtitle: 'This helps tailor your multi-event schedule and timeline layout.',
    options: [
      { label: 'Single Ceremony Announcement (1 Event)', packagePref: 'Essential Invite', icon: '💌' },
      { label: 'Core Celebrations (2 to 3 Events: Mehendi, Wedding, Reception)', packagePref: 'Wedding Plus', icon: '🎊' },
      { label: 'Comprehensive 4 to 5 Event Suite with RSVP Management', packagePref: 'Wedding Concierge', icon: '👑' },
    ],
  },
];

export default function StyleQuiz({ onSelectRecommendation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendedDesign, setRecommendedDesign] = useState(null);
  const [recommendedPackage, setRecommendedPackage] = useState('Wedding Plus');

  const handleSelectOption = (qId, option) => {
    const updated = { ...answers, [qId]: option };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommendation
      // Prioritize question 1 and 2 design preferences
      const chosenDesignId = (updated.vibe && updated.vibe.designId) || (updated.palette && updated.palette.designId) || 'royal-lake-palace';
      const design = INVITATION_DESIGNS.find((d) => d.id === chosenDesignId) || INVITATION_DESIGNS[0];
      const pkg = (updated.scale && updated.scale.packagePref) || 'Wedding Plus';
      
      setRecommendedDesign(design);
      setRecommendedPackage(pkg);
      setCurrentStep(QUESTIONS.length); // Results step
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setRecommendedDesign(null);
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <section id="style-quiz" className="section style-quiz-section" aria-label="Invitation Style Discovery Quiz">
      <div className="container">
        <div className="section-header text-center">
          <div className="quiz-header-badge">
            <span className="badge-gem">✦</span>
            <span>ATELIER DISCOVERY QUIZ</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">Discover Your Invitation Style</h2>
          <p className="section-subtitle">
            Not sure which collection suits your wedding? Answer three quick questions to receive a personalised recommendation from our atelier.
          </p>
        </div>

        <div className="quiz-card">
          {currentStep < QUESTIONS.length ? (
            /* Questions Flow */
            <div className="quiz-question-box">
              {/* Progress Bar */}
              <div className="quiz-progress-wrap">
                <div className="quiz-progress-bar" style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}></div>
              </div>
              <div className="quiz-step-indicator">
                Question {currentStep + 1} of {QUESTIONS.length}
              </div>

              <h3 className="quiz-question-title">{currentQ.question}</h3>
              <p className="quiz-question-subtitle">{currentQ.subtitle}</p>

              <div className="quiz-options-grid">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    className="quiz-option-btn"
                    onClick={() => handleSelectOption(currentQ.id, opt)}
                  >
                    <span className="quiz-opt-icon" aria-hidden="true">{opt.icon}</span>
                    <span className="quiz-opt-text">{opt.label}</span>
                    <span className="quiz-opt-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button
                  type="button"
                  className="quiz-back-btn"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  ← Back to Previous Question
                </button>
              )}
            </div>
          ) : (
            /* Recommendation Result Card */
            recommendedDesign && (
              <div className="quiz-result-box" aria-live="polite">
                <div className="quiz-result-badge">
                  <span className="badge-sparkle">✦</span>
                  <span>YOUR RECOMMENDED ATELIER STYLE</span>
                  <span className="badge-sparkle">✦</span>
                </div>

                <div className="quiz-result-grid">
                  <div className="quiz-result-image-side">
                    <img
                      src={recommendedDesign.image}
                      alt={recommendedDesign.alt}
                      className="quiz-result-img"
                    />
                  </div>

                  <div className="quiz-result-content-side">
                    <span className="result-category">{recommendedDesign.categoryLabel}</span>
                    <h3 className="result-design-name">{recommendedDesign.name}</h3>
                    <p className="result-tagline">“{recommendedDesign.tagline}”</p>
                    <p className="result-desc">{recommendedDesign.description}</p>

                    <div className="result-recommended-package">
                      <span className="rec-pkg-label">Recommended Suite:</span>
                      <strong className="rec-pkg-value">{recommendedPackage}</strong>
                    </div>

                    <div className="result-palette-row">
                      <span className="result-palette-label">Color Harmony:</span>
                      <div className="result-palette-dots">
                        {recommendedDesign.palette.map((c, idx) => (
                          <span key={idx} className="result-dot" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>

                    <div className="result-actions">
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={() => {
                          if (onSelectRecommendation) {
                            onSelectRecommendation(recommendedDesign.name, recommendedPackage);
                          }
                        }}
                      >
                        <span>Choose “{recommendedDesign.name}” &amp; Begin Consultation</span>
                        <span aria-hidden="true">→</span>
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary btn-block"
                        onClick={handleReset}
                      >
                        Retake Discovery Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
