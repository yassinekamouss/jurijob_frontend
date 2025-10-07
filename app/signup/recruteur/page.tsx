'use client';
import NavigatorForm from '@/app/signup/components/FormNavigator';
import CommunFileds from '@/app/signup/components/FormCommunFileds';

import FormRecuiter from '@/app/signup/components/FormRecuiter';

import { useState } from "react";
import FormConfirmation from '../components/FormConfirmation';
const handleSubmit = () => {
  console.log('Formulaire soumis avec les données :');
  // ici tu peux appeler ton API ou envoyer le formulaire
};
export default function RecruteurSignUp() {
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    role: "recruteur", // valeur initiale
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onFieldChange = (field: string, value: any) => {
    setFormData((prev: { [key: string]: any }) => ({ ...prev, [field]: value }));
    setErrors((prev: { [key: string]: string }) => ({ ...prev, [field]: '' }));
  };

  // ✅ Validation selon l’étape
  const handleNextStepValidation = (step: number): boolean => {
    let requiredFields: string[] = [];
    const newErrors: Record<string, string> = {};
    let valid = true;

    if (step === 1) {
      requiredFields = ["firstName", "lastName", "email", "phone", "password", "confirmPassword"];

      requiredFields.forEach((field) => {
        const value = formData[field];
        if (!value || (typeof value === "string" && value.trim() === "")) {

          newErrors[field] = "Ce champ est obligatoire";
          valid = false;
        }
      });

      if (formData.password && formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
          valid = false;
        } else {
          const password = formData.password.trim();
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
        "companyName",
        "position",
        "companyType",
        "companySize",
        "city",
        "postalCode",
        "recruitmentFocus"
      ];
    }



    requiredFields.forEach((field) => {
      const value = formData[field];

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

    setErrors(newErrors);
    return valid;
  };


  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <form className="space-y-4">
            <CommunFileds
              formData={formData}
              onFieldChange={onFieldChange}
              errors={errors}
            />
          </form>
        );
      case 2:
        return (

          <form className="space-y-4">
            <FormRecuiter
              formData={formData}
              onFieldChange={onFieldChange}
              errors={errors}
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
