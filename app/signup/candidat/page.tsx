"use client";

import NavigatorForm from "@/app/signup/components/FormNavigator";
import CommunFileds from "@/app/signup/components/FormCommunFileds";
import FormCandidat from "@/app/signup/components/FormCandidat";
import FormConfirmation from "@/app/signup/components/FormConfirmation";
import Header from "@/app/components/Header";
import Icon from "@/app/signup/components/FormularIcons";

import { useState } from "react";
import type FormData from "@/app/types/DataFormDataRegister";

export default function CandidatSignUp() {
  const [formData, setFormData] = useState<FormData>({
    user: {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      imageUrl: "",
      password: "",
      confirmPassword: "",
      role: "candidat",
    },
    candidat: {
      // posteActuel: '',
      niveauExperience: "",
      formationJuridique: "",
      specialisations: [],
      langues: [],
      domainExperiences: [],
      typeTravailRecherche: "",
      villesTravailRecherche: [],
      modeTravailRecherche: "",
      PosteRecherche: "",
    },
  });

  type UserErrors = Partial<Record<keyof FormData["user"], string>>;
  type CandidatErrors = Partial<Record<keyof FormData["candidat"], string>>;

  const [errors, setErrors] = useState<{
    user?: UserErrors;
    candidat?: CandidatErrors;
  }>({});

  const onFieldChange = (
    section: "user" | "candidat", // indique quelle partie du formData changer
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: "",
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      // console.log('Formulaire soumis avec les données :', formData);

      const { confirmPassword, ...user } = formData.user;

      // Étape 1 : préparer FormData
      const formDataToSend = new FormData();

      // Ajouter tous les champs texte sauf "imageUrl"
      Object.entries(user).forEach(([key, value]) => {
        if (key !== "imageUrl" && value !== undefined && value !== null) {
          formDataToSend.append(key, value as string);
        }
      });

      // Ajouter le fichier sous le champ "image" attendu par Multer
      if (user.imageUrl && user.imageUrl instanceof File) {
        formDataToSend.append("image", user.imageUrl);
      }

      console.log("Données utilisateur prêtes pour l'API :", user);

      // Étape 2 : envoyer le user à l’API
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (!userResponse.ok) {
        let errorMsg = "Erreur lors de la création de l'utilisateur";
        try {
          const errorData = await userResponse.json(); //  on essaye de parser le JSON
          if (errorData.message) {
            errorMsg = errorData.message; //  on récupère le vrai message du backend
          }
        } catch {
          const errorText = await userResponse.text(); // fallback si ce n'est pas du JSON
          errorMsg = errorText || errorMsg;
        }

        console.error("Réponse serveur (err):", errorMsg);
        throw new Error(errorMsg); // on lance le vrai message
      }

      const createdUser = await userResponse.json();
      const userId = createdUser.userId; // dépend de ta réponse API (par ex. `createdUser.data.id`)
      console.log("Utilisateur créé avec succès :", createdUser);
      // Étape 3 : préparer les données du candidat
      const candidatData = {
        ...formData.candidat,
        userId: userId,
      };

      // Étape 4 : envoyer le candidat à l’API
      const candidatResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/candidats/complete-profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(candidatData),
        }
      );

      if (!candidatResponse.ok) {
        const errorText = await candidatResponse.text();
        console.error("Erreur backend candidat :", errorText);
        throw new Error(errorText || "Erreur lors de la création du candidat");
      }

      console.log("Candidat créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l’envoi du formulaire :", error);
      throw error; // relance l'erreur vers FormConfirmation
    }
  };

  // ✅ Validation selon l’étape
  const handleNextStepValidation = (step: number): boolean => {
    let requiredFields: string[] = [];
    const newErrors: Record<string, string> = {};
    let valid = true;
    let section: "user" | "candidat";

    if (step === 1) {
      requiredFields = [
        "nom",
        "prenom",
        "email",
        "telephone",
        "password",
        "confirmPassword",
      ];
      section = "user";

      if (formData.user.password && formData.user.confirmPassword) {
        if (formData.user.password !== formData.user.confirmPassword) {
          newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
          valid = false;
        } else {
          const password = formData.user.password.trim();
          const hasMinLength = password.length >= 8;
          const hasUppercase = /[A-Z]/.test(password);
          const hasLowercase = /[a-z]/.test(password);
          const hasNumber = /[0-9]/.test(password);
          const hasSymbol = /[^A-Za-z0-9]/.test(password);

          if (
            !hasMinLength ||
            !hasUppercase ||
            !hasLowercase ||
            !hasNumber ||
            !hasSymbol
          ) {
            newErrors.password =
              "Le mot de passe doit contenir au moins 8 caractères, majuscules, minuscules, chiffres et symboles";
            valid = false;
          }
        }
      }
    } else if (step === 2) {
      requiredFields = [
        "niveauExperience",
        "formationJuridique",
        "specialisations",
        "langues",
        "domainExperiences",
        "PosteRecherche",
        "typeTravailRecherche",
        "villesTravailRecherche",
        "modeTravailRecherche",
      ];
      section = "candidat";

      // const atLeastOneCheckboxChecked =
      //   formData.candidat.typeTravailRecherche ||
      //   formData.candidat.villesTravailRecherche.length > 0 ||
      //   formData.candidat.modeTravailRecherche;

      // if (!atLeastOneCheckboxChecked) {
      //   newErrors.checkboxes = "Veuillez cocher au moins une option";
      //   valid = false;
      // }
    } else {
      return true; // rien à valider
    }

    // ✅ Validation générique
    requiredFields.forEach((field) => {
      const value = (formData[section] as any)[
        field as keyof (typeof formData)[typeof section]
      ];
      // ⬆ mais TypeScript n’aime pas trop ça, donc mieux de faire :
      // const value = (formData[section] as Record<string, any>)[field];

      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        newErrors[field] = "Ce champ est obligatoire";
        valid = false;
      }
    });

    setErrors((prev) => ({
      ...prev,
      [section]: {
        ...((prev as any)[section] || {}),
        ...newErrors,
      },
    }));

    return valid;
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <form className="space-y-4">
            <CommunFileds
              formData={formData.user} // ✅ on passe seulement la partie "user"
              onFieldChange={(field, value) =>
                onFieldChange("user", field, value)
              }
              errors={errors.user || {}} // ✅ uniquement les erreurs de user
            />
          </form>
        );

      case 2:
        return (
          <form className="space-y-4">
            <FormCandidat
              formData={formData.candidat as any} // ✅ on passe seulement la partie "candidat"
              onFieldChange={(field, value) =>
                onFieldChange("candidat", field, value)
              }
              errors={errors.candidat || {}} // ✅ uniquement les erreurs de candidat
            />
          </form>
        );

      case 3:
        return <FormConfirmation formData={formData} onSubmit={handleSubmit} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Decorative background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-muted/60 blur-3xl" />
      </div>

      <main className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Left: Brand/Value proposition */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-26">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                  <Icon name="Sparkles" size={18} />
                  Inscription candidat
                </span>

                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Créez votre compte et trouvez le poste juridique idéal
                </h1>

                <p className="text-muted-foreground">
                  Un processus simple, une présentation professionnelle et des
                  correspondances intelligentes.
                </p>

                <ul className="mt-4 space-y-3">
                  {[
                    "Profil clair et structuré",
                    "Mise en avant de vos spécialités",
                    "Matching avec les meilleures opportunités",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Icon name="Check" size={14} />
                      </span>
                      <span className="text-sm sm:text-base">{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="rounded-lg border border-border bg-card p-3">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <Icon name="Shield" size={18} /> Sécurisé
                    </div>
                    <p className="mt-1 text-xs">
                      Vos données restent privées et protégées.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-3">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <Icon name="Clock" size={18} /> Rapide
                    </div>
                    <p className="mt-1 text-xs">
                      Inscription en moins de 3 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right: Form wizard */}
            <section className="order-1 lg:order-2 lg:col-span-2">
              <div className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card/80 backdrop-blur p-4 sm:p-6 shadow-lg">
                <NavigatorForm onNextStep={handleNextStepValidation}>
                  {renderStep}
                </NavigatorForm>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Déjà un compte ?
                  <a
                    href="/login"
                    className="ml-1 font-medium underline-offset-4 hover:underline">
                    Se connecter
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
