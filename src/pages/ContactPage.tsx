import { ArrowRight, CalendarCheck, CheckCircle, Megaphone, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  whatsapp: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido").or(z.literal("")),
  bairro: z.string().min(2, "Informe seu bairro"),
  profissao: z.string().optional(),
  interesse: z.string().min(1, "Selecione uma área"),
  disponibilidade: z.string().min(1, "Selecione sua disponibilidade"),
  canal: z.string().min(1, "Selecione uma forma de contato"),
  mensagem: z.string().max(1000, "Mensagem muito longa").optional(),
  consentimento: z.boolean().refine((value) => value, "Autorize o contato para enviar o formulário"),
  confirmacao: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const sheetsEndpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;
const defaultFormValues: Partial<ContactForm> = {
  nome: "",
  whatsapp: "",
  email: "",
  bairro: "",
  profissao: "",
  interesse: "",
  disponibilidade: "",
  canal: "",
  mensagem: "",
  consentimento: false,
  confirmacao: "",
};

const volunteerRoles = [
  {
    icon: Users,
    title: "Campanha de Rua",
    text: "Converse com moradores e ajude a levar a trajetória de José Socorrista aos bairros, municípios e comunidades.",
  },
  {
    icon: Megaphone,
    title: "Mídias Sociais",
    text: "Compartilhe agenda, propostas e conteúdos oficiais, incluindo o Instagram @jose_socorrista.",
  },
  {
    icon: CalendarCheck,
    title: "Eventos",
    text: "Apoie reuniões, visitas e encontros com trabalhadores, famílias e lideranças comunitárias.",
  },
];

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formStartedAt = useRef(Date.now());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (data: ContactForm) => {
    if (sheetsEndpoint) {
      const payload = new URLSearchParams({
        nome: data.nome,
        whatsapp: data.whatsapp,
        email: data.email,
        bairro: data.bairro,
        profissao: data.profissao ?? "",
        interesse: data.interesse,
        disponibilidade: data.disponibilidade,
        canal: data.canal,
        mensagem: data.mensagem ?? "",
        consentimento: data.consentimento ? "sim" : "nao",
        confirmacao: data.confirmacao ?? "",
        tempoPermanenciaSegundos: String(Math.round((Date.now() - formStartedAt.current) / 1000)),
        origem: "site-jose-socorrista",
      });

      await fetch(sheetsEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });
    } else {
      await new Promise((resolve) => window.setTimeout(resolve, 800));
    }

    reset(defaultFormValues);
    formStartedAt.current = Date.now();
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl py-14 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 xl:gap-24">
        <div className="lg:col-span-12 xl:col-span-5 space-y-12">
          <div>
            <p className="label mb-6 uppercase">Unir-se ao movimento</p>
            <h2 className="display-copy text-5xl md:text-7xl text-on-surface leading-[0.95]">
              Roraima precisa <br />
              <span className="text-primary">participar.</span>
            </h2>
          </div>

          <div className="space-y-10 md:space-y-12">
            {volunteerRoles.map((role) => (
              <div key={role.title} className="group flex gap-6 md:gap-8 border-b border-hairline pb-8">
                <div className="flex-shrink-0">
                  <role.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="display-copy text-on-surface mb-2 text-xl">{role.title}</h4>
                  <p className="font-medium text-on-surface-variant leading-relaxed text-base">
                    {role.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-hairline p-8 md:p-12 relative overflow-hidden bg-surface-container rounded-3xl">
            <p className="label opacity-60 mb-8 uppercase">Perfil público</p>
            <p className="text-xl font-sans font-semibold text-on-surface leading-relaxed mb-8">
              José Carlos, conhecido como José Socorrista, tem 42 anos, é de direita, casado,
              pai de 5 filhos e morador do Senador Hélio Campos. Antes da linha de frente,
              trabalhou como motorista de caminhão e carreta. Hoje vive de perto a realidade do atendimento à população.
            </p>
            <a
              href="https://www.instagram.com/jose_socorrista?igsh=dWV4ZzE0aHJ1bzhn"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-primary hover:text-on-surface transition-colors uppercase font-bold tracking-[0.18em]"
            >
              Ver Instagram
            </a>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 py-4">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="display-copy mb-12 text-4xl md:text-5xl text-on-surface leading-none">
                  Formulário de voluntariado
                </div>
                <form
                  className="space-y-8 md:space-y-10 bg-surface-container p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl border border-hairline shadow-2xl"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    {...register("confirmacao")}
                    type="text"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-on-surface">
                    <div className="space-y-3">
                      <label className="label uppercase" htmlFor="nome">
                        Nome completo
                      </label>
                      <input
                        {...register("nome")}
                        id="nome"
                        autoComplete="name"
                        className={`w-full bg-surface border-0 border-b ${
                          errors.nome ? "border-red-500" : "border-hairline"
                        } focus:border-primary focus:ring-0 px-4 py-4 font-sans font-semibold text-lg rounded-2xl`}
                        placeholder="Seu nome"
                      />
                      {errors.nome && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.nome.message}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="label uppercase" htmlFor="whatsapp">
                        WhatsApp
                      </label>
                      <input
                        {...register("whatsapp")}
                        id="whatsapp"
                        autoComplete="tel"
                        inputMode="tel"
                        className={`w-full bg-surface border-0 border-b ${
                          errors.whatsapp ? "border-red-500" : "border-hairline"
                        } focus:border-primary focus:ring-0 px-4 py-4 font-sans font-semibold text-lg rounded-2xl`}
                        placeholder="+55 (00) 00000-0000"
                      />
                      {errors.whatsapp && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.whatsapp.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-3 text-on-surface">
                    <label className="label uppercase" htmlFor="email">
                      Endereço de e-mail
                    </label>
                    <input
                      {...register("email")}
                      id="email"
                      autoComplete="email"
                      inputMode="email"
                      className={`w-full bg-surface border-0 border-b ${
                        errors.email ? "border-red-500" : "border-hairline"
                      } focus:border-primary focus:ring-0 px-4 py-4 font-sans font-semibold text-lg rounded-2xl`}
                      placeholder="exemplo@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-on-surface">
                    <div className="space-y-3">
                      <label className="label uppercase" htmlFor="bairro">
                        Bairro, município ou comunidade
                      </label>
                      <input
                        {...register("bairro")}
                        id="bairro"
                        autoComplete="address-level2"
                        className={`w-full bg-surface border-0 border-b ${
                          errors.bairro ? "border-red-500" : "border-hairline"
                        } focus:border-primary focus:ring-0 px-4 py-4 font-sans font-semibold text-lg rounded-2xl`}
                        placeholder="Ex.: Senador Hélio Campos, Caracaraí"
                      />
                      {errors.bairro && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.bairro.message}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="label uppercase" htmlFor="profissao">
                        Profissão ou área de atuação
                      </label>
                      <input
                        {...register("profissao")}
                        id="profissao"
                        className="w-full bg-surface border-0 border-b border-hairline focus:border-primary focus:ring-0 px-4 py-4 font-sans font-semibold text-lg rounded-2xl"
                        placeholder="Ex.: saúde, transporte, comércio"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 text-on-surface">
                    <label className="label uppercase" htmlFor="interesse">
                      Como deseja participar
                    </label>
                    <select
                      {...register("interesse")}
                      id="interesse"
                      className={`flex h-16 w-full bg-surface border-0 border-b ${
                        errors.interesse ? "border-red-500" : "border-hairline"
                      } text-lg font-sans font-semibold focus:border-primary focus:ring-0 appearance-none px-4 rounded-2xl text-on-surface`}
                    >
                      <option value="" className="text-on-surface">Selecione um segmento</option>
                      <option value="street" className="text-on-surface">Campanha de Rua</option>
                      <option value="social" className="text-on-surface">Mídias Sociais</option>
                      <option value="events" className="text-on-surface">Eventos e reuniões</option>
                      <option value="neighborhood" className="text-on-surface">Apoio no bairro</option>
                      <option value="proposals" className="text-on-surface">Enviar propostas e demandas</option>
                    </select>
                    {errors.interesse && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.interesse.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-on-surface">
                    <div className="space-y-3">
                      <label className="label uppercase" htmlFor="disponibilidade">
                        Disponibilidade
                      </label>
                      <select
                        {...register("disponibilidade")}
                        id="disponibilidade"
                        className={`flex h-16 w-full bg-surface border-0 border-b ${
                          errors.disponibilidade ? "border-red-500" : "border-hairline"
                        } text-lg font-sans font-semibold focus:border-primary focus:ring-0 appearance-none px-4 rounded-2xl text-on-surface`}
                      >
                        <option value="" className="text-on-surface">Selecione um período</option>
                        <option value="manha" className="text-on-surface">Manhã</option>
                        <option value="tarde" className="text-on-surface">Tarde</option>
                        <option value="noite" className="text-on-surface">Noite</option>
                        <option value="fim-de-semana" className="text-on-surface">Fim de semana</option>
                      </select>
                      {errors.disponibilidade && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.disponibilidade.message}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="label uppercase" htmlFor="canal">
                        Melhor forma de contato
                      </label>
                      <select
                        {...register("canal")}
                        id="canal"
                        className={`flex h-16 w-full bg-surface border-0 border-b ${
                          errors.canal ? "border-red-500" : "border-hairline"
                        } text-lg font-sans font-semibold focus:border-primary focus:ring-0 appearance-none px-4 rounded-2xl text-on-surface`}
                      >
                        <option value="" className="text-on-surface">Selecione um canal</option>
                        <option value="whatsapp" className="text-on-surface">WhatsApp</option>
                        <option value="ligacao" className="text-on-surface">Ligação</option>
                        <option value="email" className="text-on-surface">E-mail</option>
                      </select>
                      {errors.canal && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.canal.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-3 text-on-surface">
                    <label className="label uppercase" htmlFor="mensagem">
                      Mensagem, demanda ou sugestão opcional
                    </label>
                    <textarea
                      {...register("mensagem")}
                      id="mensagem"
                      className={`w-full bg-surface border-0 border-b ${
                        errors.mensagem ? "border-red-500" : "border-hairline"
                      } focus:border-primary focus:ring-0 font-sans font-semibold text-lg min-h-[120px] p-6 rounded-2xl`}
                      placeholder="Conte o que você gostaria de melhorar em Roraima ou como pode ajudar."
                    />
                    {errors.mensagem && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.mensagem.message}</p>}
                  </div>

                  <div className="space-y-3 text-on-surface">
                    <label className="flex items-start gap-4 rounded-2xl border border-hairline bg-surface p-5 font-semibold leading-relaxed">
                      <input
                        {...register("consentimento")}
                        type="checkbox"
                        className="mt-1 h-5 w-5 rounded border-hairline text-primary focus:ring-primary"
                      />
                      <span>
                        Autorizo receber contato da equipe por WhatsApp, ligação ou e-mail sobre voluntariado,
                        agenda, propostas, visitas e demandas da pré-campanha.
                      </span>
                    </label>
                    {errors.consentimento && <p className="text-red-500 text-xs uppercase font-black tracking-[0.1em]">{errors.consentimento.message}</p>}
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="group/btn bg-primary text-on-primary px-6 md:px-16 py-5 md:py-6 font-black tracking-[0.1em] md:tracking-[0.14em] text-xs md:text-sm uppercase hover:bg-on-surface hover:text-surface transition-all shadow-2xl flex items-center justify-center gap-4 md:gap-6 rounded-full w-full disabled:opacity-50"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <span className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <>
                        Enviar voluntariado
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 md:p-12 bg-surface-container rounded-3xl border border-primary/20 shadow-2xl space-y-8"
              >
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl mb-4">
                  <CheckCircle className="w-12 h-12 text-on-primary" />
                </div>
                <div>
                  <h3 className="display-copy text-4xl md:text-5xl text-on-surface mb-4">
                    Formulário enviado com sucesso
                  </h3>
                  <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-sm mx-auto">
                    Obrigado por participar. Seus dados foram registrados e a equipe entrará em contato pelo WhatsApp informado.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="label text-primary hover:text-on-surface transition-colors uppercase font-bold tracking-[0.18em] flex items-center gap-2"
                  type="button"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Enviar outro formulário
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
