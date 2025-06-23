import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, saveData } from "../utils/storage";

type PersonalDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  title?: string;
};

type Objective = {
  text: string;
};

type Skill = {
  skillName: string;
  proficiency: string;
};

type Project = {
  projectName: string;
  description: string;
  role: string;
  duration: string;
};

type Experience = {
  jobTitle: string;
  companyName: string;
  location: string;
  duration: string;
  description: string;
  isCurrentlyWorking: string;
};

type Hobby = {
  hobby: string;
};

type Qualification = {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
};

type Language = {
  language: string;
  proficiency: string;
};

type Certificate = {
  certificateName: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  description?: string;
};

type Award = {
  awardName: string;
  issuingOrganization: string;
  dateReceived: string;
  description?: string;
};

type Organization = {
  organizationName: string;
  role: string;
  duration: string;
  description?: string;
};

type Reference = {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
};

type AppState = {
  personalDetails: PersonalDetails | null;
  objective: Objective | null;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  hobbies: Hobby[];
  qualifications: Qualification[];
  languages: Language[];
  certificates: Certificate[];
  awards: Award[];
  organizations: Organization[];
  references: Reference[];
};

type AppContextType = {
  state: AppState;
  updatePersonalDetails: (details: PersonalDetails) => void;
  updateObjective: (objective: Objective) => void;
  addSkill: (skill: Skill) => void;
  addProject: (project: Project) => void;
  addExperience: (experience: Experience) => void;
  addHobby: (hobby: Hobby) => void;
  addQualification: (qualification: Qualification) => void;
  addLanguage: (language: Language) => void;
  addCertificate: (certificate: Certificate) => void;
  addAward: (award: Award) => void;
  addOrganization: (organization: Organization) => void;
  addReference: (reference: Reference) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {  const [state, setState] = useState<AppState>({
    personalDetails: null,
    objective: null,
    skills: [],
    projects: [],
    experiences: [],
    hobbies: [],
    qualifications: [],
    languages: [],
    certificates: [],
    awards: [],
    organizations: [],
    references: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const personalDetails = await getData("personalDetails");
        const objective = await getData("objective");
        const skills = (await getData("skills")) || [];
        const projects = (await getData("projects")) || [];
        const experiences = (await getData("experiences")) || [];        const hobbies = (await getData("hobbies")) || [];
        const qualifications = (await getData("qualifications")) || [];
        const languages = (await getData("languages")) || [];
        const certificates = (await getData("certificates")) || [];
        const awards = (await getData("awards")) || [];
        const organizations = (await getData("organizations")) || [];
        const references = (await getData("references")) || [];

        setState({
          personalDetails,
          objective,
          skills,
          projects,
          experiences,
          hobbies,
          qualifications,
          languages,
          certificates,
          awards,
          organizations,
          references,
        });
      } catch (error) {
        console.log("Error", error);
      }
    };

    loadData();
  }, []);
  useEffect(() => {
    const saveState = async () => {
      try {
        await saveData("personalDetails", state.personalDetails);
        await saveData("objective", state.objective);
        await saveData("skills", state.skills);
        await saveData("projects", state.projects);
        await saveData("experiences", state.experiences);
        await saveData("hobbies", state.hobbies);        await saveData("qualifications", state.qualifications);
        await saveData("languages", state.languages);
        await saveData("certificates", state.certificates);
        await saveData("awards", state.awards);
        await saveData("organizations", state.organizations);
        await saveData("references", state.references);
      } catch (error) {
        console.log("Error", error);
      }
    };

    saveState();
  }, [state]);

  //save details:
  const updatePersonalDetails = (details: PersonalDetails) => {
    setState((prev) => ({ ...prev, personalDetails: details }));
  };

  const updateObjective = (objective: Objective) => {
    setState((prev) => ({ ...prev, objective }));
  };

  const addSkill = (skill: Skill) => {
    setState((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const addProject = (project: Project) => {
    setState((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const addExperience = (experience: Experience) => {
    setState((prev) => ({
      ...prev,
      experiences: [...prev.experiences, experience],
    }));
  };

  const addHobby = (hobby: Hobby) => {
    setState((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, hobby],
    }));
  };

  const addQualification = (qualification: Qualification) => {
    setState((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, qualification],
    }));
  };
  const addLanguage = (language: Language) => {
    setState((prev) => ({
      ...prev,
      languages: [...prev.languages, language],
    }));
  };

  const addCertificate = (certificate: Certificate) => {
    setState((prev) => ({
      ...prev,
      certificates: [...prev.certificates, certificate],
    }));
  };

  const addAward = (award: Award) => {
    setState((prev) => ({
      ...prev,
      awards: [...prev.awards, award],
    }));
  };

  const addOrganization = (organization: Organization) => {
    setState((prev) => ({
      ...prev,
      organizations: [...prev.organizations, organization],
    }));
  };

  const addReference = (reference: Reference) => {
    setState((prev) => ({
      ...prev,
      references: [...prev.references, reference],
    }));
  };
  // this is the context value that will be provided to the children components
  // it contains the state and the functions to update the state
  const contextValue: AppContextType = {
    state,
    updatePersonalDetails,
    updateObjective,
    addSkill,
    addProject,
    addExperience,
    addHobby,
    addQualification,
    addLanguage,
    addCertificate,
    addAward,
    addOrganization,
    addReference,
  };

  // the AppContext.Provider component wraps the children components and provides the context value
  // this allows the children components to access the context value using the useAppContext hook
  // the children components can then use the context value to access the state and the functions to update the state
  // this is how the context value is provided to the children components 
  // and how the children components can access the context value
  // this is a common pattern in React to manage global state and provide it to the children
  // components without having to pass props down through every level of the component tree
  // this allows for a more modular and reusable code structure
  // and makes it easier to manage the state of the application
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// this hook allows components to access the app context
// it uses the useContext hook to get the context value from the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Use app context must be used within a app provider");
  }

  return context;
};