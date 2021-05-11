import moment from 'moment';
import { ProposalTypes } from 'enums/ProposalTypes';

export class ProposalDataHelper {

    public static getProposalData = (proposalType: ProposalTypes, data: any, slimVersion:boolean) => {
        switch (proposalType) {
            case ProposalTypes.Personal:
                if(slimVersion){
                    return ProposalDataHelper.getPersonalProposalDataSlim(data);
                }else{                    
                    return ProposalDataHelper.getPersonalProposalData(data);
                }
                break; 
            case ProposalTypes.BusinessSole:
                return ProposalDataHelper.getSoleProposalData(data);
                break; 
            case ProposalTypes.BusinessPartner:
                return ProposalDataHelper.getPartnershipProposalData(data);
                break; 
            case ProposalTypes.BusinessLtd:
                return ProposalDataHelper.getLimitedProposalData(data);
        }
    }

    static getPersonalProposalDataSlim = (data) => {
        const result = {};

        result["person"] = {
            hirerTitleId: data["2"]?.title,
            foreName: data["2"]?.firstName,
            middleName: data["2"]?.middleName,
            surName: data["2"]?.lastName,
            mobile: data["2"]?.mobileNumber,
            landline: data["2"]?.homeNumber,
            email: data["2"]?.emailAddress,
            birthDate: (data["3"].dob) ? moment(data["3"].dob).format("DD/MM/YYYY") : null,
            genderId: data["3"]?.genderId,
            nationalityId: data["3"]?.nationalityId,
            maritalStatusId: data["3"]?.maritalStatusId,
            propertyStatusId: data["3"]?.propertyStatusId,
            propertyTenureId: data["3"]?.propertyTenureId,
            propertyTypeId: data["3"]?.propertyTypeId,
            dependents: data["3"]?.dependents,

            addresses: data["4"]?.addresses?.map((item, index) => {
                return ProposalDataHelper.getAddress(item);
            })
        };

        result["income"] = {
            grossAnnualSalary: data["4"]?.grossAnnualSalary,
            netMonthlySalary: data["4"]?.netMonthlySalary,
            grossMonthlySalary: data["4"]?.grossMonthlySalary,
            partnerNetMonthlySalary: data["4"]?.partnerNetMonthlySalary,
            partnerGrossMonthlySalary: data["4"]?.partnerGrossMonthlySalary,
            otherIncome: data["4"]?.otherIncome,
            otherIncomeDetails: data["4"]?.otherIncomeDetails,

            mortgageRent: data["5"]?.mortgageRent,
            utilityBills: data["5"]?.utilityBills,
            loans: data["5"]?.loans,
            totalMonthlyExpenditure: data["5"]?.totalMonthlyExpenditure,
            //cardRepaymentAmount: self.expenditures.cardRepaymentAmount(), - not used on website
            otherExpenses: data["5"]?.otherExpenses,
            currentCarPayment: data["5"]?.currentCarPayment,
            replacesCurrentCar: data["5"]?.replacesCurrentCar == "yes"
        }

        if (data["5"]) {
            result["creditCards"] = {
                amex: data["5"].amex || false,
                masterCard: data["5"].masterCard || false,
                visa: data["5"].visa || false,
                other: data["5"].other || false
            };
        }

        if (data["6"] && data["6"].employments) {
            result["employments"] = data["6"].employments.map((item, index) => {
                return ProposalDataHelper.getEmployment(item);
            });
        }

        if (data["7"] || data["8"]) {
            result["bank"] = ProposalDataHelper.getBankDetails(data["7"], data["8"])
        }

        result["notes"] = data["5"]?.notes
        return result;
    }

    static getPersonalProposalData = (data) => {
        const result = {};

        result["person"] = {
            hirerTitleId: data["2"]?.title,
            foreName: data["2"]?.firstName,
            middleName: data["2"]?.middleName,
            surName: data["2"]?.lastName,
            mobile: data["2"]?.mobileNumber,
            landline: data["2"]?.homeNumber,
            email: data["2"]?.emailAddress,
            birthDate: (data["3"].dob) ? moment(data["3"].dob).format("DD/MM/YYYY") : null,
            genderId: data["3"]?.genderId,
            nationalityId: data["3"]?.nationalityId,
            maritalStatusId: data["3"]?.maritalStatusId,
            propertyStatusId: data["3"]?.propertyStatusId,
            propertyTenureId: data["3"]?.propertyTenureId,
            propertyTypeId: data["3"]?.propertyTypeId,
            dependents: data["3"]?.dependents,
            addresses: data["4"]?.addresses?.map((item, index) => {
                return ProposalDataHelper.getAddress(item);
            })
        };

        result["income"] = {
            netMonthlySalary: data["5"]?.netMonthlySalary,
            grossMonthlySalary: data["5"]?.grossMonthlySalary,
            partnerNetMonthlySalary: data["5"]?.partnerNetMonthlySalary,
            partnerGrossMonthlySalary: data["5"]?.partnerGrossMonthlySalary,
            otherIncome: data["5"]?.otherIncome,
            otherIncomeDetails: data["5"]?.otherIncomeDetails,

            mortgageRent: data["6"]?.mortgageRent,
            utilityBills: data["6"]?.utilityBills,
            loans: data["6"]?.loans,
            totalMonthlyExpenditure: data["6"]?.totalMonthlyExpenditure,
            //cardRepaymentAmount: self.expenditures.cardRepaymentAmount(), - not used on website
            otherExpenses: data["6"]?.otherExpenses,
            currentCarPayment: data["6"]?.currentCarPayment,
            replacesCurrentCar: data["6"]?.replacesCurrentCar == "yes"
        }

        if (data["6"]) {
            result["creditCards"] = {
                amex: data["6"].amex || false,
                masterCard: data["6"].masterCard || false,
                visa: data["6"].visa || false,
                other: data["6"].other || false
            };
        }

        if (data["7"] && data["7"].employments) {
            result["employments"] = data["7"].employments.map((item, index) => {
                return ProposalDataHelper.getEmployment(item);
            });
        }

        if (data["8"] || data["9"]) {
            result["bank"] = ProposalDataHelper.getBankDetails(data["8"], data["9"])
        }

        result["notes"] = data["6"]?.notes
        return result;
    }

    static getSoleProposalData = (data) => {

        const result = ProposalDataHelper.getBusinessProposalBase(data["2"], data["3"]);
        result["businessPerson"] = ProposalDataHelper.getBusinessPerson(data["4"]);
        result["bank"] = ProposalDataHelper.getBankDetails(data["5"], data["6"])

        return result;
    }

    static getPartnershipProposalData = (data) => {

        const result = ProposalDataHelper.getBusinessProposalBase(data["2"], data["3"])
        result["partners"] = [
            ProposalDataHelper.getBusinessPerson(data["4"]),
            ProposalDataHelper.getBusinessPerson(data["5"])
        ]
        result["bank"] = ProposalDataHelper.getBankDetails(data["6"], data["7"])

        return result;
    }

    static getLimitedProposalData = (data) => {

        const result = ProposalDataHelper.getBusinessProposalBase(data["2"], data["3"])
        result["directors"] = data["4"].directors?.map((item, index) => {
            return ProposalDataHelper.getBusinessPerson(item);
        })
        result["bank"] = ProposalDataHelper.getBankDetails(data["5"], data["6"])

        return result;
    }

    static getAddress = (address) => {
        const result = {
            address1: address.address1,
            address2: address.address2,
            address3: address.address3,
            postcode: address.postcode,
            town: address.town,
            county: address.county,
            fromDate: (address.fromDate) ? moment(address.fromDate).format("DD/MM/YYYY") : null,
            monthsAtAddress: address.timeAtAddressMonths,
            yearsAtAddress: address.timeAtAddressYears
        }

        return result;
    };

    static getEmployment = (data) => {
        const result = {
            typeId: data.typeId,
            position: data.position,
            employerName: data.employerName,
            natureOfBusiness: data.natureOfBusiness,
            telephone: data.telephone,
            startDate: (data.startDate) ? moment(data.startDate).format("DD/MM/YYYY") : null,
            yearsEmployed: data.timeEmployedYears,
            monthsEmployed: data.timeEmployedMonths,
            address: {
                address1: data.address1,
                address2: data.address2,
                address3: data.address3,
                postcode: data.postcode,
                town: data.town,
                county: data.county,
            }
        }

        return result;
    };

    static getBusinessPerson = (data) => {
        return {
            hirerTitleId: data.title,
            name: `${data.firstName} ${data.middleName} ${data.lastName}`,
            foreName: data.firstName,
            middleName: data.middleName,
            surName: data.lastName,
            birthDate: (data.dob) ? moment(data.dob).format("DD/MM/YYYY") : null,
            genderId: data.genderId,
            email: data.emailAddress,
            nationalityId: data.nationalityId,
            maritalStatusId: data.maritalStatusId,
            propertyStatusId: data.propertyStatusId,
            propertyTypeId: data.propertyTypeId,
            addresses: data?.addresses?.map((item, index) => {
                return ProposalDataHelper.getAddress(item);
            })
        };
    }

    static getBankDetails = (accountData, addressData) => {
        return {
            sortCode: accountData.sortCode,
            bankName: accountData.bankName,
            accountName: accountData.accountName,
            accountNumber: accountData.accountNumber,
            yearsWithBank: (parseInt(addressData.bankYears) || 0),
            address: ProposalDataHelper.getAddress(addressData)
        };
    }

    static getBusinessProposalBase = (details, contactPage) => {
       
        var result = {
            tradingName: details.tradingName,
            natureOfBusiness: details.natureOfBusiness,
            dateEstablished: (details.establishedDate) ? moment(details.establishedDate).format("DD/MM/YYYY") : null,
            vatNumber: details.vatNumber,
            parentCompany: details.parentCompany,
            companyReg: details.companyReg,
            email: contactPage.emailAddress,
            landline: contactPage.landline,
            fax: contactPage.fax,
            mobile: contactPage.mobileNumber,
            addresses: [ProposalDataHelper.getAddress(contactPage)],

            notes: contactPage?.notes
        };
        return result;
    }
}