'use client';
import NavigatorForm from '@/app/signup/components/FormNavigator';
import CommunFileds from '@/app/signup/components/FormCommunFileds';

import FormRecruteur from '@/app/signup/components/FormRecuiter';
import UserBase from '@/app/types/userBase';

import { useState } from "react";
import FormConfirmation from '../components/FormConfirmation';
import FormData from '@/app/types/DataFormDataRegister';
// import recruteur from '@/app/types/recruteur';


export default function RecruteurSignUp() {
  const [formData, setFormData] = useState<FormData>({
    user: {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'recruteur',
    },
    recruteur: {
      nomEntreprise: '',
      poste: '',
      typeOrganisation: '',
      tailleEntreprise: '',
      siteWeb: '',
      ville: '',
      codePostal: '',
    },
  });
 const handleSubmit = async () => {


    try {

      // console.log('Formulaire soumis avec les données :', formData);

      const { confirmPassword, ...user } = formData.user;

      console.log('Données utilisateur prêtes pour l\'API :', user);

      // Étape 2 : envoyer le user à l’API
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error("Réponse serveur (err):", errorText);
        throw new Error("Erreur lors de la création de l'utilisateur");
      }

      const createdUser = await userResponse.json();
      const userId = createdUser.userId; // dépend de ta réponse API (par ex. `createdUser.data.id`)
      console.log("Utilisateur créé avec succès :", createdUser);
      // Étape 3 : préparer les données du recruteur
      const recruteurForm = {
        ...formData.recruteur,
        userId: userId,
      };
      console.log('Données recruteur prêtes pour l\'API :', recruteurForm);
      // Étape 4 : envoyer le recruteur à l’API
      const recruteurResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruteurs/complete-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recruteurForm),
      });
      if (!recruteurResponse.ok) throw new Error("Erreur lors de la création du recruteur");

      // ici tu peux appeler ton API ou envoyer le formulaire
      console.log('Données recruteur prêtes pour l\'API :', recruteurForm);
    } catch (error) {
      console.error("Erreur lors de l’envoi du formulaire :", error);
    }


  };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const onFieldChange = (
    section: 'user' | 'recruteur', // indique quelle partie du formData changer
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
  // ✅ Validation selon l’étape
  const handleNextStepValidation = (step: number): boolean => {
    let requiredFields: string[] = [];
    const newErrors: Record<string, string> = {};
    let valid = true;
    let section: 'user' | 'recruteur';

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
    }

    else if (step === 2) {
      requiredFields = [
        "nomEntreprise",
        "typeOrganisation",
        "tailleEntreprise",
        // "siteWeb",
        "ville",
        "codePostal",
      ];
      section = 'recruteur';
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


  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <form className="space-y-4">
            <CommunFileds
              formData={formData.user}          // ✅ on passe seulement la partie "user"
              onFieldChange={(field, value) => onFieldChange('user', field, value)}
              errors={errors.user as any || {}}        // ✅ uniquement les erreurs de user
            />
          </form>
        );
      case 2:
        return (

          <form className="space-y-4">
            <FormRecruteur
              formData={formData.recruteur as any}          // ✅ on passe seulement la partie "recruteur"
              onFieldChange={(field, value) => onFieldChange('recruteur', field, value)}
              errors={errors.recruteur as any || {}}        // ✅ uniquement les erreurs de recruteur
            />
          </form>
        );

      case 3:
        return (
          <FormConfirmation formData={formData} onSubmit={handleSubmit} />
        );
    }
  };

  return <NavigatorForm onNextStep={handleNextStepValidation}>{renderStep}</NavigatorForm>;
}
