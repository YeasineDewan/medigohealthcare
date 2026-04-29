import { api } from './api';

const applicationService = {
  // Doctor Application Services
  doctorApplication: {
    submit: async (formData) => {
      try {
        const formDataToSend = new FormData();
        
        // Basic fields
        formDataToSend.append('first_name', formData.firstName);
        formDataToSend.append('last_name', formData.lastName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('date_of_birth', formData.dateOfBirth || '');
        formDataToSend.append('gender', formData.gender || '');
        formDataToSend.append('specialization', formData.specialization);
        formDataToSend.append('sub_specialization', formData.subSpecialization || '');
        formDataToSend.append('experience_years', formData.experience);
        formDataToSend.append('qualification', formData.qualification);
        formDataToSend.append('post_graduation', formData.postGraduation || '');
        formDataToSend.append('bmdc_number', formData.bmdcNumber);
        formDataToSend.append('bmdc_registration_date', formData.bmdcRegistrationDate);
        formDataToSend.append('current_hospital', formData.hospital || '');
        formDataToSend.append('designation', formData.designation || '');
        formDataToSend.append('consultation_fee', formData.consultationFee || '');
        formDataToSend.append('online_consultation_fee', formData.onlineConsultationFee || '');
        formDataToSend.append('about', formData.about || '');
        
        // JSON fields
        formDataToSend.append('availability', JSON.stringify(formData.availability));
        formDataToSend.append('languages', JSON.stringify(formData.languages));
        formDataToSend.append('services', JSON.stringify(formData.services));
        formDataToSend.append('achievements', JSON.stringify(formData.achievements));
        formDataToSend.append('publications', JSON.stringify(formData.publications));
        formDataToSend.append('memberships', JSON.stringify(formData.memberships));
        formDataToSend.append('bank_account', JSON.stringify(formData.bankAccount));
        formDataToSend.append('emergency_contact', JSON.stringify(formData.emergencyContact));
        formDataToSend.append('social_links', JSON.stringify(formData.socialLinks));
        formDataToSend.append('preferences', JSON.stringify(formData.preferences));
        
        // Files
        if (formData.profilePhoto) {
          formDataToSend.append('profile_photo', formData.profilePhoto);
        }
        if (formData.identityDocument) {
          formDataToSend.append('identity_document', formData.identityDocument);
        }
        if (formData.certificates && formData.certificates.length > 0) {
          formData.certificates.forEach((certificate, index) => {
            formDataToSend.append(`certificates[${index}]`, certificate);
          });
        }
        
        const response = await api.post('/applications/doctor', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        return response.data;
      } catch (error) {
        console.error('Doctor application submission error:', error);
        throw error;
      }
    },
    
    checkStatus: async (email) => {
      try {
        const response = await api.get(`/applications/doctor/status/${email}`);
        return response.data;
      } catch (error) {
        console.error('Check status error:', error);
        throw error;
      }
    },
    
    getSpecializations: async () => {
      try {
        const response = await api.get('/applications/doctor/specializations');
        return response.data;
      } catch (error) {
        console.error('Get specializations error:', error);
        throw error;
      }
    },
    
    getStatistics: async () => {
      try {
        const response = await api.get('/applications/doctor/statistics');
        return response.data;
      } catch (error) {
        console.error('Get statistics error:', error);
        throw error;
      }
    }
  },
  
  // Hospital Application Services
  hospitalApplication: {
    submit: async (formData) => {
      try {
        const formDataToSend = new FormData();
        
        // Basic fields
        formDataToSend.append('hospital_name', formData.hospitalName);
        formDataToSend.append('hospital_type', formData.hospitalType);
        formDataToSend.append('established_year', formData.establishedYear || '');
        formDataToSend.append('registration_number', formData.registrationNumber || '');
        formDataToSend.append('contact_person_name', formData.contactPerson);
        formDataToSend.append('contact_person_designation', formData.designation);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('alternate_phone', formData.alternatePhone || '');
        formDataToSend.append('address', formData.address);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('district', formData.district);
        formDataToSend.append('postal_code', formData.postalCode || '');
        formDataToSend.append('total_beds', formData.beds);
        formDataToSend.append('icu_beds', formData.icuBeds || '');
        formDataToSend.append('emergency_beds', formData.emergencyBeds || '');
        formDataToSend.append('website', formData.website || '');
        formDataToSend.append('about', formData.about || '');
        formDataToSend.append('mission', formData.mission || '');
        formDataToSend.append('vision', formData.vision || '');
        
        // JSON fields
        formDataToSend.append('emergency_services', JSON.stringify(formData.emergencyServices));
        formDataToSend.append('specializations', JSON.stringify(formData.specializations));
        formDataToSend.append('departments', JSON.stringify(formData.departments));
        formDataToSend.append('facilities', JSON.stringify(formData.facilities));
        formDataToSend.append('medical_equipment', JSON.stringify(formData.equipment));
        formDataToSend.append('social_media', JSON.stringify(formData.socialMedia));
        formDataToSend.append('achievements', JSON.stringify(formData.achievements));
        formDataToSend.append('awards', JSON.stringify(formData.awards));
        formDataToSend.append('accreditations', JSON.stringify(formData.accreditations));
        formDataToSend.append('partnerships', JSON.stringify(formData.partnerships));
        formDataToSend.append('bank_details', JSON.stringify(formData.bankDetails));
        formDataToSend.append('emergency_contact', JSON.stringify(formData.emergencyContact));
        formDataToSend.append('technical_contact', JSON.stringify(formData.technicalContact));
        formDataToSend.append('services_offered', JSON.stringify(formData.services));
        formDataToSend.append('integration_capabilities', JSON.stringify(formData.integration));
        
        // Files
        if (formData.documents && formData.documents.length > 0) {
          formData.documents.forEach((document, index) => {
            formDataToSend.append(`documents[${index}]`, document);
          });
        }
        
        const response = await api.post('/applications/hospital', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        return response.data;
      } catch (error) {
        console.error('Hospital application submission error:', error);
        throw error;
      }
    },
    
    checkStatus: async (email) => {
      try {
        const response = await api.get(`/applications/hospital/status/${email}`);
        return response.data;
      } catch (error) {
        console.error('Check status error:', error);
        throw error;
      }
    },
    
    getCities: async () => {
      try {
        const response = await api.get('/applications/hospital/cities');
        return response.data;
      } catch (error) {
        console.error('Get cities error:', error);
        throw error;
      }
    },
    
    getSpecializations: async () => {
      try {
        const response = await api.get('/applications/hospital/specializations');
        return response.data;
      } catch (error) {
        console.error('Get specializations error:', error);
        throw error;
      }
    },
    
    getStatistics: async () => {
      try {
        const response = await api.get('/applications/hospital/statistics');
        return response.data;
      } catch (error) {
        console.error('Get statistics error:', error);
        throw error;
      }
    }
  }
};

export default applicationService;
