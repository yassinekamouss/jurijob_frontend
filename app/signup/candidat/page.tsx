'use client';

import NavigatorForm from '@/app/signup/components/FormNavigator';
import CommunFileds from '@/app/signup/components/FormCommunFileds';

import FormCandidat from '@/app/signup/components/FormCandidat';

import { useState } from "react";
import FormConfirmation from '@/app/signup/components/FormConfirmation';
// import { form } from 'framer-motion/client';

import type FormData from '@/app/types/DataFormDataRegister';
import Header from '@/app/components/Header';
// import UserBase from '@/app/types/userBase';
// import { console } from 'inspector';
// import candidat from '@/app/types/candidat';

export default function CandidatSignUp() {

  const [formData, setFormData] = useState<FormData>({
    user: {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      imageUrl:'',
      password: '',
      confirmPassword: '',
      role: 'candidat',
    },
    candidat: {
      // posteActuel: '',
      niveauExperience: '',
      formationJuridique: '',
      specialisations: [],
      langues: [],
      domainExperiences: [],
      typeTravailRecherche: '',
      villesTravailRecherche: [],
      modeTravailRecherche: '',
      PosteRecherche: '',

    },
  });


  type UserErrors = Partial<Record<keyof FormData['user'], string>>;
  type CandidatErrors = Partial<Record<keyof FormData['candidat'], string>>;

  const [errors, setErrors] = useState<{
    user?: UserErrors;
    candidat?: CandidatErrors;
  }>({});

  const onFieldChange = (
    section: 'user' | 'candidat', // indique quelle partie du formData changer
    field: string,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    setErrors(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: '',
      },
    }));
  };

  const handleSubmit = async () => {


    try {

      // console.log('Formulaire soumis avec les données :', formData);

      const { confirmPassword, ...user } = formData.user;


          // Étape 1 — préparer FormData
    
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
     const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
      method: "POST",
      body: formDataToSend,
    });
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error("Réponse serveur (err):", errorText);
        throw new Error("Erreur lors de la création de l'utilisateur");
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
      const candidatResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidats/complete-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidatData),
      });
      if (!candidatResponse.ok) throw new Error("Erreur lors de la création du candidat");

      // ici tu peux appeler ton API ou envoyer le formulaire
      console.log('Données candidat prêtes pour l\'API :', candidatData);
    } catch (error) {
      console.error("Erreur lors de l’envoi du formulaire :", error);
    }


  };

  // ✅ Validation selon l’étape
  const handleNextStepValidation = (step: number): boolean => {
    let requiredFields: string[] = [];
    const newErrors: Record<string, string> = {};
    let valid = true;
    let section: 'user' | 'candidat';

    if (step === 1) {
      requiredFields = ["nom", "prenom", "email", "telephone", "password", "confirmPassword"];
      section = 'user';

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

          if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSymbol) {
            newErrors.password =
              "Le mot de passe doit contenir au moins 8 caractères, majuscules, minuscules, chiffres et symboles";
            valid = false;
          }
        }
      }
    } else if (step === 2) {
      requiredFields = ["niveauExperience", "formationJuridique", "specialisations", "langues"];
      section = 'candidat';

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
      const value = (formData[section] as any)[field as keyof (typeof formData)[typeof section]];
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

    setErrors(prev => ({
      ...prev,
      [section]: {
        ...((prev as any)[section] || {}),
        ...newErrors,
      },
    }));

    return valid;
  };


  // const renderStep = (step: number) => {
  //   switch (step) {
  //     case 1:
  //       return (


  //         <form className="space-y-4">
  //           <CommunFileds
  //             formData={formData}
  //             onFieldChange={onFieldChange}
  //             errors={errors}
  //           />

  //         </form>
  //       );
  //     case 2:
  //       return (

  //         <form className="space-y-4">
  //           <FormCandidat
  //             formData={formData}
  //             onFieldChange={onFieldChange}
  //             errors={errors}
  //           />
  //         </form>
  //       );
  //     case 3:
  //       return (
  //         <FormConfirmation formData={formData} onSubmit={handleSubmit} />

  //       );
  //   }
  // };

  // return <NavigatorForm onNextStep={handleNextStepValidation}>{renderStep}</NavigatorForm>;
  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <form className="space-y-4">
            <CommunFileds
              formData={formData.user}          // ✅ on passe seulement la partie "user"
              onFieldChange={(field, value) => onFieldChange('user', field, value)}
              errors={errors.user || {}}        // ✅ uniquement les erreurs de user
            />
          </form>
        );

      case 2:
        return (
          <form className="space-y-4">
            <FormCandidat
              formData={formData.candidat as any}       // ✅ on passe seulement la partie "candidat"
              onFieldChange={(field, value) => onFieldChange('candidat', field, value)}
              errors={errors.candidat || {}}     // ✅ uniquement les erreurs de candidat
            />
          </form>
        );

      case 3:
        return (
          <FormConfirmation
            formData={formData}
            onSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
    <Header/>
  
    <NavigatorForm onNextStep={handleNextStepValidation}>
      {renderStep}
    </NavigatorForm>
      </div>
  );

}
