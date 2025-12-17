import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const categories = [
  {
    id: 'relaxation',
    title: 'Упражнения на расслабление',
    icon: 'Flower2',
    color: 'bg-green-100 text-green-700',
    exercises: [
      { name: 'Прогрессивная мышечная релаксация', duration: '15 мин', level: 'Начальный' },
      { name: 'Визуализация спокойного места', duration: '10 мин', level: 'Начальный' },
      { name: 'Сканирование тела', duration: '20 мин', level: 'Средний' },
    ]
  },
  {
    id: 'meditation',
    title: 'Медитация для спокойствия',
    icon: 'Wind',
    color: 'bg-blue-100 text-blue-700',
    exercises: [
      { name: 'Медитация осознанности', duration: '10 мин', level: 'Начальный' },
      { name: 'Любящая доброта', duration: '15 мин', level: 'Средний' },
      { name: 'Медитация на дыхание', duration: '5 мин', level: 'Начальный' },
    ]
  },
  {
    id: 'yoga',
    title: 'Йога от тревожности',
    icon: 'Heart',
    color: 'bg-emerald-100 text-emerald-700',
    exercises: [
      { name: 'Поза ребёнка', duration: '5 мин', level: 'Начальный' },
      { name: 'Приветствие солнцу', duration: '15 мин', level: 'Средний' },
      { name: 'Йога-нидра', duration: '30 мин', level: 'Продвинутый' },
    ]
  },
  {
    id: 'breathing',
    title: 'Упражнения с дыханием',
    icon: 'Waves',
    color: 'bg-cyan-100 text-cyan-700',
    exercises: [
      { name: 'Дыхание 4-7-8', duration: '5 мин', level: 'Начальный' },
      { name: 'Диафрагмальное дыхание', duration: '10 мин', level: 'Начальный' },
      { name: 'Альтернативное дыхание', duration: '8 мин', level: 'Средний' },
    ]
  },
];

const quotes = [
  { text: 'Внутри тебя есть тишина и святилище, в которое ты можешь уйти в любое время и быть самим собой.', author: 'Герман Гессе' },
  { text: 'Спокойствие — это не отсутствие бури, а покой среди неё.', author: 'Неизвестен' },
  { text: 'Дыхание — это мост между телом и разумом.', author: 'Тит Нат Хан' },
  { text: 'Ты не можешь остановить волны, но можешь научиться плавать.', author: 'Джон Кабат-Зинн' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [userProgress] = useState({
    sessionsCompleted: 12,
    totalMinutes: 240,
    streak: 5,
  });

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
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
                onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                <span className="hidden sm:inline">Главная</span>
              </Button>
              <Button
                variant={activeTab === 'quotes' ? 'default' : 'ghost'}
                onClick={() => { setActiveTab('quotes'); setSelectedCategory(null); }}
                className="gap-2"
              >
                <Icon name="Sparkles" size={18} />
                <span className="hidden sm:inline">Цитаты</span>
              </Button>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => { setActiveTab('profile'); setSelectedCategory(null); }}
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
            ) : (
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
                            className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                          >
                            <CardHeader>
                              <CardTitle className="text-lg">{exercise.name}</CardTitle>
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
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'quotes' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">Мотивирующие цитаты</h2>
              <p className="text-green-700">Вдохновение для вашей практики</p>
            </div>

            <Card className="p-8 md:p-12 border-2 border-green-200 shadow-xl">
              <div className="text-center space-y-6 min-h-[200px] flex flex-col justify-center">
                <Icon
                  name="Quote"
                  size={48}
                  className="mx-auto text-green-300 animate-float"
                />
                <blockquote className="text-2xl md:text-3xl font-medium text-green-800 leading-relaxed">
                  "{quotes[currentQuoteIndex].text}"
                </blockquote>
                <p className="text-lg text-green-600 font-semibold">
                  — {quotes[currentQuoteIndex].author}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevQuote}
                  className="rounded-full"
                >
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextQuote}
                  className="rounded-full"
                >
                  <Icon name="ChevronRight" size={20} />
                </Button>
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

            <Card>
              <CardHeader>
                <CardTitle>Прогресс по категориям</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name={category.icon as any} size={20} className="text-green-600" />
                        <span className="font-medium">{category.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 10) + 1} / {category.exercises.length}
                      </span>
                    </div>
                    <Progress value={(Math.random() * 100)} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

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