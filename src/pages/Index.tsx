import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const categories = [
  {
    id: 'relaxation',
    title: 'Упражнения на расслабление',
    icon: 'Flower2',
    color: 'bg-green-100 text-green-700',
    exercises: [
      { 
        name: 'Прогрессивная мышечная релаксация', 
        duration: '15 мин', 
        level: 'Начальный',
        videoUrl: 'https://www.youtube.com/embed/86HUctvvMjg',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        description: 'Техника последовательного напряжения и расслабления мышц тела для глубокого отдыха'
      },
      { 
        name: 'Визуализация спокойного места', 
        duration: '10 мин', 
        level: 'Начальный',
        videoUrl: 'https://www.youtube.com/embed/ZToicYcHIOU',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4b636f9b58.mp3',
        description: 'Мысленное путешествие в спокойное место для снятия стресса и тревоги'
      },
      { 
        name: 'Сканирование тела', 
        duration: '20 мин', 
        level: 'Средний',
        videoUrl: 'https://www.youtube.com/embed/1nZEdqcGVzo',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_d1718ab41b.mp3',
        description: 'Практика осознанного внимания к ощущениям в разных частях тела'
      },
    ]
  },
  {
    id: 'meditation',
    title: 'Медитация для спокойствия',
    icon: 'Wind',
    color: 'bg-blue-100 text-blue-700',
    exercises: [
      { 
        name: 'Медитация осознанности', 
        duration: '10 мин', 
        level: 'Начальный',
        videoUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_0694e45c91.mp3',
        description: 'Базовая практика присутствия в моменте здесь и сейчас'
      },
      { 
        name: 'Любящая доброта', 
        duration: '15 мин', 
        level: 'Средний',
        videoUrl: 'https://www.youtube.com/embed/sz7cpV7ERsM',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_2dae0cfdf7.mp3',
        description: 'Медитация для развития сострадания к себе и другим'
      },
      { 
        name: 'Медитация на дыхание', 
        duration: '5 мин', 
        level: 'Начальный',
        videoUrl: 'https://www.youtube.com/embed/SEfs5TJZ6Nk',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        description: 'Концентрация внимания на естественном дыхании'
      },
    ]
  },
  {
    id: 'yoga',
    title: 'Йога от тревожности',
    icon: 'Heart',
    color: 'bg-emerald-100 text-emerald-700',
    exercises: [
      { 
        name: 'Поза ребёнка', 
        duration: '5 мин', 
        level: 'Начальный',
        videoUrl: 'https://www.youtube.com/embed/2MN9lBu72IU',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_d1718ab41b.mp3',
        description: 'Успокаивающая поза для расслабления спины и снятия напряжения'
      },
      { 
        name: 'Приветствие солнцу', 
        duration: '15 мин', 
        level: 'Средний',
        videoUrl: 'https://www.youtube.com/embed/73sjOu0g58E',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4b636f9b58.mp3',
        description: 'Динамическая последовательность асан для пробуждения энергии'
      },
      { 
        name: 'Йога-нидра', 
        duration: '30 мин', 
        level: 'Продвинутый',
        videoUrl: 'https://www.youtube.com/embed/M0u9GST_j3s',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_0694e45c91.mp3',
        description: 'Глубокое расслабление через управляемую медитацию лёжа'
      },
    ]
  },
  {
    id: 'breathing',
    title: 'Упражнения с дыханием',
    icon: 'Waves',
    color: 'bg-cyan-100 text-cyan-700',
    exercises: [
      { 
        name: 'Дыхание 4-7-8', 
        duration: '5 мин', 
        level: 'Начальный',
        videoUrl: 'https://www.youtube.com/embed/gz4G31LGyog',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_2dae0cfdf7.mp3',
        description: 'Техника ритмичного дыхания для быстрого успокоения'
      },
      { 
        name: 'Диафрагмальное дыхание', 
        duration: '10 мин', 
        level: 'Начальный',
        videoUrl: 'https://www.youtube.com/embed/1Dv-ldGLumM',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_d1718ab41b.mp3',
        description: 'Глубокое дыхание животом для снижения стресса'
      },
      { 
        name: 'Альтернативное дыхание', 
        duration: '8 мин', 
        level: 'Средний',
        videoUrl: 'https://www.youtube.com/embed/8VwufJrUhic',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        description: 'Попеременное дыхание ноздрями для баланса энергии'
      },
    ]
  },
];

const quotes = [
  { text: 'Внутри тебя есть тишина и святилище, в которое ты можешь уйти в любое время и быть самим собой.', author: 'Герман Гессе' },
  { text: 'Спокойствие — это не отсутствие бури, а покой среди неё.', author: 'Неизвестен' },
  { text: 'Дыхание — это мост между телом и разумом.', author: 'Тит Нат Хан' },
  { text: 'Ты не можешь остановить волны, но можешь научиться плавать.', author: 'Джон Кабат-Зинн' },
];

const exerciseTips = [
  {
    title: 'Создайте комфортную обстановку',
    description: 'Выберите тихое место, приглушите свет, используйте удобную одежду',
    icon: 'Lightbulb'
  },
  {
    title: 'Регулярность важнее длительности',
    description: 'Лучше практиковать 5 минут каждый день, чем час раз в неделю',
    icon: 'Calendar'
  },
  {
    title: 'Не судите себя',
    description: 'Отвлечение мыслей — это нормально. Просто мягко возвращайте внимание к практике',
    icon: 'Heart'
  },
  {
    title: 'Начинайте с малого',
    description: 'Если вы новичок, начните с упражнений уровня "Начальный" на 5-10 минут',
    icon: 'Target'
  },
];

const stressFoods = [
  {
    name: 'Зелёный чай',
    benefit: 'Содержит L-теанин, который снижает тревожность и улучшает концентрацию',
    icon: '🍵',
    category: 'Напитки'
  },
  {
    name: 'Тёмный шоколад',
    benefit: 'Снижает уровень кортизола (гормона стресса) и улучшает настроение',
    icon: '🍫',
    category: 'Десерты'
  },
  {
    name: 'Орехи (миндаль, грецкие)',
    benefit: 'Богаты магнием и витамином B, которые помогают регулировать стресс',
    icon: '🥜',
    category: 'Перекусы'
  },
  {
    name: 'Жирная рыба (лосось, сардины)',
    benefit: 'Омега-3 кислоты поддерживают здоровье мозга и снижают воспаление',
    icon: '🐟',
    category: 'Основное'
  },
  {
    name: 'Ягоды (черника, клубника)',
    benefit: 'Антиоксиданты защищают клетки мозга от стресса',
    icon: '🫐',
    category: 'Фрукты'
  },
  {
    name: 'Авокадо',
    benefit: 'Содержит витамины группы B, которые помогают нервной системе',
    icon: '🥑',
    category: 'Овощи'
  },
  {
    name: 'Йогурт и кефир',
    benefit: 'Пробиотики улучшают связь кишечник-мозг и настроение',
    icon: '🥛',
    category: 'Молочное'
  },
  {
    name: 'Бананы',
    benefit: 'Богаты калием и триптофаном, которые способствуют спокойствию',
    icon: '🍌',
    category: 'Фрукты'
  },
];

const moodEmojis = [
  { emoji: '😟', label: 'Очень плохо', value: 1 },
  { emoji: '😕', label: 'Плохо', value: 2 },
  { emoji: '😐', label: 'Нормально', value: 3 },
  { emoji: '🙂', label: 'Хорошо', value: 4 },
  { emoji: '😊', label: 'Отлично', value: 5 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [moodBefore, setMoodBefore] = useState<number | null>(null);
  const [moodAfter, setMoodAfter] = useState<number | null>(null);
  const [exerciseStartTime, setExerciseStartTime] = useState<number | null>(null);
  
  const [showTimerDialog, setShowTimerDialog] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminders, setReminders] = useState<string[]>(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [moodHistory, setMoodHistory] = useState<any[]>(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
      sessionsCompleted: 0,
      totalMinutes: 0,
      streak: 0,
    };
  });

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };
  
  const toggleFavorite = (exerciseName: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(exerciseName)
        ? prev.filter(name => name !== exerciseName)
        : [...prev, exerciseName];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };
  
  const startExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setShowMoodTracker(true);
    setMoodBefore(null);
    setMoodAfter(null);
  };
  
  const submitMoodBefore = (mood: number) => {
    setMoodBefore(mood);
    setShowMoodTracker(false);
    setExerciseStartTime(Date.now());
  };
  
  const completeExercise = () => {
    setShowMoodTracker(true);
  };
  
  const submitMoodAfter = (mood: number) => {
    setMoodAfter(mood);
    const duration = exerciseStartTime ? Math.round((Date.now() - exerciseStartTime) / 60000) : 0;
    
    const newHistory = {
      exercise: selectedExercise.name,
      moodBefore,
      moodAfter: mood,
      date: new Date().toISOString(),
      duration,
    };
    
    const updatedHistory = [...moodHistory, newHistory];
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    
    const updatedProgress = {
      sessionsCompleted: userProgress.sessionsCompleted + 1,
      totalMinutes: userProgress.totalMinutes + duration,
      streak: userProgress.streak + 1,
    };
    setUserProgress(updatedProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
    
    setShowMoodTracker(false);
    
    toast({
      title: 'Отличная работа! 🎉',
      description: `Вы улучшили настроение на ${mood - (moodBefore || 0)} ${mood > (moodBefore || 0) ? 'пункта' : 'пункт'}!`,
    });
    
    setTimeout(() => {
      setSelectedExercise(null);
      setMoodBefore(null);
      setMoodAfter(null);
    }, 2000);
  };
  
  const addReminder = () => {
    if (reminderTime && !reminders.includes(reminderTime)) {
      const newReminders = [...reminders, reminderTime];
      setReminders(newReminders);
      localStorage.setItem('reminders', JSON.stringify(newReminders));
      setShowTimerDialog(false);
      
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            toast({
              title: 'Напоминание добавлено! ⏰',
              description: `Мы напомним вам о практике в ${reminderTime}`,
            });
          }
        });
      }
    }
  };
  
  const removeReminder = (time: string) => {
    const newReminders = reminders.filter(t => t !== time);
    setReminders(newReminders);
    localStorage.setItem('reminders', JSON.stringify(newReminders));
  };
  
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      if (reminders.includes(currentTime)) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Время для практики! 🧘', {
            body: 'Не забудьте уделить время своему благополучию',
            icon: '/favicon.svg',
          });
        }
        
        toast({
          title: 'Время для практики! 🧘',
          description: 'Не забудьте уделить время своему благополучию',
        });
      }
    };
    
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [reminders]);
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const getFavoriteExercises = () => {
    const allExercises: any[] = [];
    categories.forEach(cat => {
      cat.exercises.forEach((ex: any) => {
        if (favorites.includes(ex.name)) {
          allExercises.push({ ...ex, category: cat.title, categoryColor: cat.color, categoryIcon: cat.icon });
        }
      });
    });
    return allExercises;
  };

  const getWeeklyStats = () => {
    const weeks = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);
      
      const sessionsInWeek = moodHistory.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= weekStart && entryDate < weekEnd;
      }).length;
      
      weeks.push({
        week: `Нед ${7 - i}`,
        sessions: sessionsInWeek,
      });
    }
    
    return weeks;
  };

  const getMoodChartData = () => {
    return moodHistory.slice(-10).map((entry, idx) => ({
      session: `#${idx + 1}`,
      before: entry.moodBefore,
      after: entry.moodAfter,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-emerald-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Leaf" size={32} className="text-green-600 animate-float" />
              <h1 className="text-2xl font-bold text-green-800">Спокойствие</h1>
            </div>
            <nav className="flex gap-2">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => { setActiveTab('home'); setSelectedCategory(null); setSelectedExercise(null); }}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                <span className="hidden sm:inline">Главная</span>
              </Button>
              <Button
                variant={activeTab === 'favorites' ? 'default' : 'ghost'}
                onClick={() => { setActiveTab('favorites'); setSelectedCategory(null); setSelectedExercise(null); }}
                className="gap-2"
              >
                <Icon name="Heart" size={18} />
                <span className="hidden sm:inline">Избранное</span>
              </Button>
              <Button
                variant={activeTab === 'tips' ? 'default' : 'ghost'}
                onClick={() => { setActiveTab('tips'); setSelectedCategory(null); setSelectedExercise(null); }}
                className="gap-2"
              >
                <Icon name="Lightbulb" size={18} />
                <span className="hidden sm:inline">Советы</span>
              </Button>
              <Button
                variant={activeTab === 'nutrition' ? 'default' : 'ghost'}
                onClick={() => { setActiveTab('nutrition'); setSelectedCategory(null); setSelectedExercise(null); }}
                className="gap-2"
              >
                <Icon name="Apple" size={18} />
                <span className="hidden sm:inline">Питание</span>
              </Button>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => { setActiveTab('profile'); setSelectedCategory(null); setSelectedExercise(null); }}
                className="gap-2"
              >
                <Icon name="User" size={18} />
                <span className="hidden sm:inline">Профиль</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {!selectedCategory ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-green-800 mb-4">
                    Добро пожаловать в пространство спокойствия
                  </h2>
                  <p className="text-lg text-green-700 max-w-2xl mx-auto">
                    Выберите практику, которая поможет вам расслабиться и обрести внутренний покой
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {categories.map((category, index) => (
                    <Card
                      key={category.id}
                      className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 animate-scale-in border-2 border-green-100"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className={`p-4 rounded-2xl ${category.color}`}>
                            <Icon name={category.icon as any} size={32} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                            <CardDescription>
                              {category.exercises.length} упражнений
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </>
            ) : !selectedExercise ? (
              <div className="animate-fade-in">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                  className="mb-6 gap-2"
                >
                  <Icon name="ArrowLeft" size={18} />
                  Назад
                </Button>

                {categories
                  .filter((cat) => cat.id === selectedCategory)
                  .map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`p-4 rounded-2xl ${category.color}`}>
                          <Icon name={category.icon as any} size={40} />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-green-800">{category.title}</h2>
                          <p className="text-green-700">Выберите упражнение для начала практики</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.exercises.map((exercise, idx) => (
                          <Card
                            key={idx}
                            className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer relative"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(exercise.name);
                              }}
                            >
                              <Icon 
                                name={favorites.includes(exercise.name) ? "Heart" : "Heart"} 
                                size={20}
                                className={favorites.includes(exercise.name) ? "fill-red-500 text-red-500" : "text-gray-400"}
                              />
                            </Button>
                            <div onClick={() => startExercise(exercise)}>
                              <CardHeader>
                                <CardTitle className="text-lg pr-8">{exercise.name}</CardTitle>
                                <CardDescription className="line-clamp-2">{exercise.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-col gap-3">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Icon name="Clock" size={16} />
                                    {exercise.duration}
                                  </div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="secondary" className="w-fit">
                                      {exercise.level}
                                    </Badge>
                                    <Badge variant="outline" className="w-fit gap-1">
                                      <Icon name="Video" size={12} />
                                      Видео
                                    </Badge>
                                    <Badge variant="outline" className="w-fit gap-1">
                                      <Icon name="Music" size={12} />
                                      Звук
                                    </Badge>
                                  </div>
                                  <Button className="w-full mt-2 gap-2">
                                    <Icon name="Play" size={16} />
                                    Начать
                                  </Button>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="animate-fade-in max-w-6xl mx-auto">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedExercise(null)}
                  className="mb-6 gap-2"
                >
                  <Icon name="ArrowLeft" size={18} />
                  Назад к упражнениям
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">{selectedExercise.name}</CardTitle>
                        <CardDescription className="text-base">{selectedExercise.description}</CardDescription>
                        <div className="flex gap-2 mt-4">
                          <Badge variant="secondary">{selectedExercise.level}</Badge>
                          <Badge variant="outline" className="gap-1">
                            <Icon name="Clock" size={14} />
                            {selectedExercise.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <iframe
                            width="100%"
                            height="100%"
                            src={selectedExercise.videoUrl}
                            title={selectedExercise.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name="Music" size={20} className="text-green-600" />
                          Успокаивающие звуки
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                          <div className="flex items-center justify-center mb-4">
                            <div className="relative">
                              <div className={`w-20 h-20 rounded-full bg-green-100 flex items-center justify-center ${isPlayingAudio ? 'animate-pulse' : ''}`}>
                                <Icon name="Music2" size={32} className="text-green-600" />
                              </div>
                              {isPlayingAudio && (
                                <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-75" />
                              )}
                            </div>
                          </div>
                          <audio
                            controls
                            className="w-full"
                            src={selectedExercise.audioUrl}
                            onPlay={() => setIsPlayingAudio(true)}
                            onPause={() => setIsPlayingAudio(false)}
                            onEnded={() => setIsPlayingAudio(false)}
                          >
                            Ваш браузер не поддерживает аудио.
                          </audio>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          Включите фоновую музыку для более глубокого погружения в практику
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name="Lightbulb" size={20} className="text-amber-600" />
                          Совет
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">
                          Найдите тихое место, где вас никто не побеспокоит. Примите удобное положение и следуйте инструкциям в видео.
                        </p>
                        <Button 
                          className="w-full gap-2" 
                          variant="outline"
                          onClick={completeExercise}
                        >
                          <Icon name="CheckCircle2" size={16} />
                          Завершить упражнение
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-green-800 mb-4">
                Избранные упражнения
              </h2>
              <p className="text-lg text-green-700 max-w-2xl mx-auto">
                Ваши любимые практики для быстрого доступа
              </p>
            </div>

            {getFavoriteExercises().length === 0 ? (
              <Card className="max-w-md mx-auto text-center p-8">
                <Icon name="Heart" size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-muted-foreground">
                  У вас пока нет избранных упражнений. Добавьте их, нажав на ❤️ на карточке упражнения.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {getFavoriteExercises().map((exercise, idx) => (
                  <Card
                    key={idx}
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exercise.name);
                      }}
                    >
                      <Icon 
                        name="Heart"
                        size={20}
                        className="fill-red-500 text-red-500"
                      />
                    </Button>
                    <div onClick={() => startExercise(exercise)}>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-2 rounded-lg ${exercise.categoryColor}`}>
                            <Icon name={exercise.categoryIcon as any} size={16} />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {exercise.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg pr-8">{exercise.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{exercise.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="Clock" size={16} />
                            {exercise.duration}
                          </div>
                          <Badge variant="secondary" className="w-fit">
                            {exercise.level}
                          </Badge>
                          <Button className="w-full mt-2 gap-2">
                            <Icon name="Play" size={16} />
                            Начать
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-green-800 mb-4">Советы по практике</h2>
              <p className="text-lg text-green-700">Эффективные рекомендации для успешного выполнения упражнений</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {exerciseTips.map((tip, idx) => (
                <Card key={idx} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex gap-4">
                    <div className="bg-green-100 p-3 rounded-xl h-fit">
                      <Icon name={tip.icon as any} size={28} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-2">{tip.title}</h3>
                      <p className="text-green-700">{tip.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
              <div className="text-center">
                <Icon name="Info" size={40} className="mx-auto text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-3">Важное напоминание</h3>
                <p className="text-lg text-green-700 max-w-2xl mx-auto leading-relaxed">
                  Практики осознанности и релаксации — это навык, который развивается со временем. 
                  Будьте терпеливы и добры к себе в процессе обучения. Каждая сессия — это шаг к большему спокойствию.
                </p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-green-800 mb-4">Питание против стресса</h2>
              <p className="text-lg text-green-700">Продукты, которые помогают снизить тревожность и улучшить настроение</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {stressFoods.map((food, idx) => (
                <Card key={idx} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">{food.icon}</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-1">{food.name}</h3>
                    <Badge variant="outline" className="mb-3">{food.category}</Badge>
                  </div>
                  <p className="text-green-700 text-sm leading-relaxed">{food.benefit}</p>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Icon name="AlertCircle" size={32} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-orange-800 mb-3">Рекомендации</h3>
                  <ul className="space-y-2 text-orange-700">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Пейте достаточно воды (1.5-2 литра в день) — обезвоживание усиливает стресс</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Ограничьте кофеин после обеда — он может усилить тревожность</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Избегайте обработанных продуктов и сахара — они влияют на уровень энергии</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Ешьте регулярно небольшими порциями — это стабилизирует уровень сахара в крови</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">Ваш профиль</h2>
              <p className="text-green-700">Отслеживайте свой прогресс</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <Icon name="CheckCircle2" size={32} className="text-green-600" />
                  </div>
                  <CardTitle className="text-3xl">{userProgress.sessionsCompleted}</CardTitle>
                  <CardDescription>Завершённых сессий</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <Icon name="Clock" size={32} className="text-blue-600" />
                  </div>
                  <CardTitle className="text-3xl">{userProgress.totalMinutes}</CardTitle>
                  <CardDescription>Минут практики</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <Icon name="Flame" size={32} className="text-orange-600" />
                  </div>
                  <CardTitle className="text-3xl">{userProgress.streak}</CardTitle>
                  <CardDescription>Дней подряд</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Напоминания
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowTimerDialog(true)}
                      className="gap-2"
                    >
                      <Icon name="Plus" size={16} />
                      Добавить
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reminders.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Нет активных напоминаний
                    </p>
                  ) : (
                    reminders.map((time, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Bell" size={20} className="text-green-600" />
                          <span className="font-medium">{time}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeReminder(time)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>История настроения</CardTitle>
                </CardHeader>
                <CardContent>
                  {moodHistory.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Завершите упражнение, чтобы увидеть историю
                    </p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {moodHistory.slice(-5).reverse().map((entry, idx) => (
                        <div key={idx} className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{entry.exercise}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>{moodEmojis[entry.moodBefore - 1]?.emoji}</span>
                            <Icon name="ArrowRight" size={14} className="text-green-600" />
                            <span>{moodEmojis[entry.moodAfter - 1]?.emoji}</span>
                            {entry.moodAfter > entry.moodBefore && (
                              <Badge variant="outline" className="ml-auto text-green-600">
                                +{entry.moodAfter - entry.moodBefore}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика по неделям</CardTitle>
                  <CardDescription>Количество завершённых сессий за последние 7 недель</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getWeeklyStats()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#10b981" name="Сессии" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>График улучшения настроения</CardTitle>
                  <CardDescription>Как практики влияют на ваше настроение (последние 10 сессий)</CardDescription>
                </CardHeader>
                <CardContent>
                  {moodHistory.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Завершите несколько упражнений, чтобы увидеть график
                    </p>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={getMoodChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="session" />
                        <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="before" stroke="#3b82f6" name="До практики" strokeWidth={2} />
                        <Line type="monotone" dataKey="after" stroke="#10b981" name="После практики" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Dialog open={showMoodTracker} onOpenChange={setShowMoodTracker}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {moodBefore === null ? 'Как вы себя чувствуете?' : 'Как вы чувствуете себя после практики?'}
            </DialogTitle>
            <DialogDescription>
              {moodBefore === null 
                ? 'Оцените своё настроение перед началом упражнения'
                : 'Оцените своё настроение после завершения упражнения'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-3 py-4">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => moodBefore === null ? submitMoodBefore(mood.value) : submitMoodAfter(mood.value)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-green-50 transition-colors border-2 border-transparent hover:border-green-200"
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className="text-xs text-center">{mood.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTimerDialog} onOpenChange={setShowTimerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить напоминание</DialogTitle>
            <DialogDescription>
              Мы напомним вам о практике в выбранное время
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="time">Время напоминания</Label>
              <Input
                id="time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
            <Button onClick={addReminder} className="w-full gap-2">
              <Icon name="Bell" size={16} />
              Добавить напоминание
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-green-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-green-700">
          <p className="flex items-center justify-center gap-2">
            Создано с <Icon name="Heart" size={16} className="text-red-500" /> для вашего благополучия
          </p>
        </div>
      </footer>
    </div>
  );
}