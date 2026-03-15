/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShoppingBag,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex gap-4 justify-center items-center font-baloo">
      <div className="bg-amber-500 text-white px-4 py-2 rounded-lg text-center min-w-[80px]">
        <span className="text-3xl font-bold block leading-none">{minutes.toString().padStart(2, '0')}</span>
        <span className="text-xs uppercase">Minutos</span>
      </div>
      <span className="text-3xl font-bold text-amber-500">:</span>
      <div className="bg-amber-500 text-white px-4 py-2 rounded-lg text-center min-w-[80px]">
        <span className="text-3xl font-bold block leading-none">{seconds.toString().padStart(2, '0')}</span>
        <span className="text-xs uppercase">Segundos</span>
      </div>
    </div>
  );
};

const PurchaseNotification = () => {
  const [visible, setVisible] = useState(false);
  const [currentName, setCurrentName] = useState('');
  
  const names = [
    'Joice', 'Joana', 'Antonia', 'Francisca', 'Carla', 'Paula', 'Petra', 'Luana', 
    'Luiza', 'Marcia', 'Lis', 'Gabriela', 'Rafaela', 'Daniela', 'Marcela', 'Bruna', 
    'Eduarda', 'Felipa', 'Manoela', 'Marta', 'Andreia', 'Fernanda', 'Fabricia', 
    'Adriana', 'Luciana', 'Julia', 'Renata', 'Maria', 'Flavia', 'Mari', 'Dani'
  ];

  useEffect(() => {
    const showNext = () => {
      setCurrentName(names[Math.floor(Math.random() * names.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
      
      const nextDelay = Math.floor(Math.random() * (15000 - 8000) + 8000);
      setTimeout(showNext, nextDelay);
    };

    const initialDelay = 4000;
    const timeout = setTimeout(showNext, initialDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed bottom-4 left-4 z-50 bg-white shadow-2xl rounded-xl p-4 border border-zinc-100 flex items-center gap-3 max-w-[280px]"
        >
          <div className="bg-green-100 p-2 rounded-full">
            <ShoppingBag className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-zinc-600">
              <span className="font-bold text-zinc-900">{currentName}</span> acabou de comprar o <span className="text-green-600 font-semibold">Pacote Premium</span>
            </p>
            <p className="text-[10px] text-zinc-400">há poucos segundos</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:text-green-600 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-zinc-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const handleRedirect = (e: React.MouseEvent, baseUrl: string) => {
    e.preventDefault();
    const search = window.location.search;
    if (!search) {
      window.location.href = baseUrl;
      return;
    }
    
    const separator = baseUrl.includes('?') ? '&' : '?';
    const cleanSearch = search.startsWith('?') ? search.substring(1) : search;
    window.location.href = `${baseUrl}${separator}${cleanSearch}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PurchaseNotification />

      {/* Announcement Bar */}
      <div className="bg-green-600 text-white py-3 px-4 text-center font-semibold text-sm md:text-base">
        <p className="flex items-center justify-center gap-2">
          <Star className="w-4 h-4 fill-white" />
          PARABÉNS! VOCÊ ACABA DE GANHAR UM SUPER DESCONTO NO PACOTE PREMIUM.
          <Star className="w-4 h-4 fill-white" />
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-zinc-900 to-red-950 text-white pt-16 pb-32 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black font-baloo text-amber-400 mb-6 leading-tight"
          >
            ATENÇÃO:
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <CountdownTimer />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl font-medium text-zinc-300 mb-12"
          >
            Em alguns instantes esse desconto vai acabar. <br className="hidden md:block" />
            Restam apenas <span className="text-red-500 font-bold">3 VAGAS</span> com desconto especial.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            {/* Premium Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-zinc-900/50 backdrop-blur-sm border-2 border-amber-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-amber-500 text-zinc-900 font-bold px-6 py-1 rounded-bl-2xl uppercase text-xs tracking-widest">
                Mais Vendido
              </div>
              
              <h2 className="text-3xl font-black font-baloo mb-2 text-white">PREMIUM</h2>
              <p className="text-green-400 font-bold text-sm mb-6 uppercase tracking-wider">Acesso Vitalício + Bônus</p>
              
              <ul className="text-left space-y-4 mb-8">
                {[
                  "E-book completo: 50 receitas de brigadeiros sem fogo",
                  "Curso completo de geladinhos gourmet",
                  "70 Receitas de brigadeiros gourmet tradicional",
                  "60 Receitas de geladinho gourmet",
                  "50 Receitas de doces fit",
                  "40 Receitas de bolos caseiros",
                  "Atualizações gratuitas",
                  "7 dias de garantia",
                  "Acesso imediato!"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-200 text-sm md:text-base italic">
                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 mb-8">
                <p className="text-zinc-400 line-through text-lg">De R$ 49,99</p>
                <p className="text-red-500 line-through text-xl font-bold">Por R$ 14,99</p>
                <div className="bg-green-600/20 py-4 rounded-2xl border border-green-500/30">
                  <p className="text-zinc-300 text-sm mb-1">Somente hoje por:</p>
                  <p className="text-5xl font-black text-white font-baloo">R$ 9,99</p>
                  <p className="text-zinc-300 font-bold mt-1">Pagamento Único</p>
                </div>
              </div>

              <a 
                href="https://pay.lowify.com.br/go.php?offer=4g3sw2u" 
                onClick={(e) => handleRedirect(e, "https://pay.lowify.com.br/go.php?offer=4g3sw2u")}
                className="block w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-lg shadow-green-900/20 uppercase animate-pulse-subtle"
              >
                Garantir Minha Vaga!
              </a>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-zinc-400 text-xs">
                <ShieldCheck className="w-4 h-4" />
                Pagamento 100% Seguro
              </div>
            </motion.div>

            {/* Basic Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white text-zinc-900 rounded-3xl p-8 shadow-xl border border-zinc-200 self-start lg:mt-12"
            >
              <h2 className="text-2xl font-black font-baloo mb-2">BÁSICO</h2>
              <p className="text-zinc-500 font-bold text-xs mb-6 uppercase tracking-wider">Acesso Vitalício</p>

              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-start gap-3 text-zinc-600 text-sm md:text-base italic">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>E-book: 50 receitas de brigadeiro sem fogo</span>
                </li>
                <li className="flex items-start gap-3 text-zinc-300 text-sm md:text-base italic line-through">
                  <Check className="w-5 h-5 text-zinc-200 shrink-0" />
                  <span>Bônus Especiais</span>
                </li>
                <li className="flex items-start gap-3 text-zinc-300 text-sm md:text-base italic line-through">
                  <Check className="w-5 h-5 text-zinc-200 shrink-0" />
                  <span>Atualizações gratuitas</span>
                </li>
              </ul>

              <div className="mb-8">
                <p className="text-zinc-400 text-sm mb-1">Investimento único de:</p>
                <p className="text-4xl font-black text-green-700 font-baloo">R$ 2,99</p>
              </div>

              <a 
                href="https://pay.lowify.com.br/checkout?product_id=I7k7FR" 
                onClick={(e) => handleRedirect(e, "https://pay.lowify.com.br/checkout?product_id=I7k7FR")}
                className="block w-full bg-zinc-800 hover:bg-zinc-900 text-white font-bold py-4 rounded-xl text-lg transition-all"
              >
                Plano Básico
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-24 bg-zinc-900 text-white px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-48 h-48 md:w-64 md:h-64 shrink-0"
          >
            <img 
              src="https://cmrdigital.com.br/wp-content/uploads/2024/12/SELO-7-DIAS-ALPHA-1.png.webp" 
              alt="Garantia de 7 Dias" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black font-baloo mb-6 text-amber-400">RISCO ZERO PARA VOCÊ!</h2>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              Nós confiamos tanto em nossos estudos e pesquisas que lhe garantimos <span className="text-white font-bold">7 dias de garantia incondicional!</span> Se por qualquer motivo você não gostar do conteúdo, basta nos enviar um e-mail e devolveremos 100% do seu dinheiro.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black font-baloo text-center mb-16 text-zinc-900">DÚVIDAS FREQUENTES</h2>
          <div className="space-y-2">
            <FAQItem 
              question="Como irei receber meu acesso?" 
              answer="Assim que você realizar a compra, você receberá no seu e-mail o link de acesso. Basta criar a sua senha e entrar na plataforma. O acesso é imediato após a confirmação do pagamento."
            />
            <FAQItem 
              question="Por quanto tempo terei acesso?" 
              answer="Tanto no Plano Básico quanto no Premium, o seu acesso é vitalício. Você paga uma única vez e pode consultar as receitas e bônus para sempre, inclusive as futuras atualizações no caso do Premium."
            />
            <FAQItem 
              question="O pagamento é seguro?" 
              answer="Sim, é 100% seguro. Utilizamos plataformas de pagamento líderes de mercado (Kiwify e CartPanda) que possuem criptografia de ponta para garantir a segurança dos seus dados."
            />
            <FAQItem 
              question="Preciso de equipamentos caros?" 
              answer="Não! O grande diferencial do nosso método é que os brigadeiros são feitos sem fogo, utilizando técnicas simples e ingredientes que você encontra em qualquer supermercado."
            />
          </div>

          <div className="mt-16 text-center">
            <p className="text-zinc-600 mb-6">Ainda ficou com alguma dúvida? Fale com nossa equipe:</p>
            <a 
              href="https://wa.me/message/4MCF5NWJ4GMWI1" 
              onClick={(e) => handleRedirect(e, "https://wa.me/message/4MCF5NWJ4GMWI1")}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-100 py-12 px-4 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">
            &copy; 2026 Brigadeiros Sem Fogo Premium. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-zinc-400 text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-zinc-600">Termos de Uso</a>
            <a href="#" className="hover:text-zinc-600">Privacidade</a>
            <a href="#" className="hover:text-zinc-600">Contato</a>
          </div>
          <div className="mt-8 flex justify-center items-center gap-2 text-zinc-400">
            <AlertCircle className="w-4 h-4" />
            <p className="text-[10px] max-w-md">
              Este site não faz parte do Google ou do Facebook. Além disso, este site NÃO é endossado pelo Google ou pelo Facebook de nenhuma maneira.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
