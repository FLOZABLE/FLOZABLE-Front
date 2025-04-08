import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import parser from "html-react-parser";

const tocs = [
  { link: "#personalinfo", name: "WHAT INFORMATION DO WE COLLECT?" },
  { link: "#infouse", name: "HOW DO WE PROCESS YOUR INFORMATION?" },
  {
    link: "#legalbases",
    name: "WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?",
  },
  {
    link: "#whoshare",
    name: "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
  },
  {
    link: "#cookies",
    name: "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
  },
  { link: "#sociallogins", name: "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" },
  { link: "#inforetain", name: "HOW LONG DO WE KEEP YOUR INFORMATION?" },
  { link: "#infosafe", name: "HOW DO WE KEEP YOUR INFORMATION SAFE?" },
  { link: "#privacyrights", name: "WHAT ARE YOUR PRIVACY RIGHTS?" },
  { link: "#DNT", name: "CONTROLS FOR DO-NOT-TRACK FEATURES" },
  {
    link: "#uslaws",
    name: "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
  },
  { link: "#policyupdates", name: "DO WE MAKE UPDATES TO THIS NOTICE?" },
  { link: "#contact", name: "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" },
  {
    link: "#request",
    name: "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
  },
];

const contents = [
  {
    title: "WHAT INFORMATION DO WE COLLECT?",
    id: "personalinfo",
    info: [
      {
        subHeading: "Personal information you disclose to us",
        description: `In Short: We collect personal information that you provide to us.<br /><br />We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.<br /><br />Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:<br /><br />names<br />email addresses<br />user names<br />passwords<br />contact or authentication data<br /><br />Sensitive information. We do not process sensitive information.<br /><br />Social Media Login Data. We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.<br /><br />All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.`,
      },
      {
        subHeading: "Information automatically collected",
        description: `In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.<br /><br />We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.<br /><br />Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: https://flozable.com/cookies.<br /><br />The information we collect includes:<br /><br />Location Data. We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.`,
      },
    ],
  },
  {
    title: "HOW DO WE PROCESS YOUR INFORMATION?",
    id: "infouse",
    info: [
      {
        subHeading: "In Short",
        description: `We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.`,
      },
      {
        subHeading: "Why We Process Your Information",
        description: `We process your personal information for a variety of reasons, depending on how you interact with our Services, including:<br /><br />To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.<br />To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.`,
      },
    ],
  },
  {
    title: "WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?",
    id: "legalbases",
    info: [
      {
        subHeading: "In Short",
        description: `We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.`,
      },
      {
        subHeading: "For EU or UK Users",
        description: `The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:<br /><br />Consent. We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about withdrawing your consent.<br />Legal Obligations. We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.<br />Vital Interests. We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.`,
      },
      {
        subHeading: "For Canadian Users",
        description: `We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.<br /><br />In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:<br /><br />If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way.<br />For investigations and fraud detection and prevention.<br />For business transactions provided certain conditions are met.<br />If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim.<br />For identifying injured, ill, or deceased persons and communicating with next of kin.<br />If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse.<br />If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province.<br />If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records.<br />If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced.<br />If the collection is solely for journalistic, artistic, or literary purposes.<br />If the information is publicly available and is specified by the regulations.`,
      },
    ],
  },
  {
    title: "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
    id: "whoshare",
    info: [
      {
        subHeading: "In Short",
        description: `We may share information in specific situations described in this section and/or with the following third parties.`,
      },
      {
        subHeading: "Business Transfers",
        description: `We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.`,
      },
    ],
  },
  {
    title: "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
    id: "cookies",
    info: [
      {
        subHeading: "In Short",
        description: `We may use cookies and other tracking technologies to collect and store your information.`,
      },
      {
        subHeading: "Tracking Technologies",
        description: `We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice: <a href="https://flozable.com/cookies">https://flozable.com/cookies</a>.`,
      },
    ],
  },
  {
    title: "HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
    id: "sociallogins",
    info: [
      {
        subHeading: "In Short",
        description: `If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.`,
      },
      {
        subHeading: "Social Media Logins",
        description: `Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.<br /><br />We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.`,
      },
    ],
  },
  {
    title: "HOW LONG DO WE KEEP YOUR INFORMATION?",
    id: "inforetain",
    info: [
      {
        subHeading: "In Short",
        description: `We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.`,
      },
      {
        subHeading: "Retention Period",
        description: `We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.<br /><br />When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.`,
      },
    ],
  },
  {
    title: "HOW DO WE KEEP YOUR INFORMATION SAFE?",
    id: "infosafe",
    info: [
      {
        subHeading: "In Short",
        description: `We aim to protect your personal information through a system of organizational and technical security measures.`,
      },
      {
        subHeading: "Security Measures",
        description: `We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.`,
      },
    ],
  },
  {
    title: "WHAT ARE YOUR PRIVACY RIGHTS?",
    id: "privacyrights",
    info: [
      {
        subHeading: "In Short",
        description: `In some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.`,
      },
      {
        subHeading: "Your Rights",
        description: `In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.<br /><br />We will consider and act upon any request in accordance with applicable data protection laws.`,
      },
      {
        subHeading: "Complaints and Withdrawal of Consent",
        description: `If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your Member State data protection authority or UK data protection authority.<br /><br />If you are located in Switzerland, you may contact the Federal Data Protection and Information Commissioner.<br /><br />If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below or updating your preferences.<br /><br />However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.`,
      },
      {
        subHeading: "Account Information",
        description: `If you would at any time like to review or change the information in your account or terminate your account, you can:<br />- Log in to your account settings and update your user account.<br />- Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.`,
      },
      {
        subHeading: "Cookies and Similar Technologies",
        description: `Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. For further information, please see our Cookie Notice: <a href="https://flozable.com/cookies">https://flozable.com/cookies</a>.`,
      },
      {
        subHeading: "Contact Us",
        description: `If you have questions or comments about your privacy rights, you may email us at <a href="mailto:support@flozable.com">support@flozable.com</a>.`,
      },
    ],
  },
  {
    title: "CONTROLS FOR DO-NOT-TRACK FEATURES",
    id: "DNT",
    info: [
      {
        subHeading: "In Short",
        description: `Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.`,
      },
      {
        subHeading: "Current Status",
        description: `At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.`,
      },
      {
        subHeading: "Future Changes",
        description: `If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.`,
      },
    ],
  },
  {
    title: "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
    id: "uslaws",
    info: [
      {
        subHeading: "In Short",
        description: `If you are a resident of California, Colorado, Connecticut, Utah or Virginia, you are granted specific rights regarding access to your personal information.`,
      },
      {
        subHeading: "Categories of Personal Information Collected",
        description: `We have collected the following categories of personal information in the past twelve (12) months: We will use and retain the collected personal information as needed to provide the Services or for: Category B - As long as the user has an account with us.`,
      },
      {
        subHeading: "Other Personal Information",
        description: `We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail, such as: Receiving help through our customer support channels, participation in customer surveys or contests, and facilitation in the delivery of our Services and to respond to your inquiries.`,
      },
      {
        subHeading: "How We Use and Share Your Information",
        description: `We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.`,
      },
      {
        subHeading: "California Residents",
        description: `California Civil Code Section 1798.83, also known as the "Shine The Light" law permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year.`,
      },
      {
        subHeading: "Under 18 and in California",
        description: `If you are under 18 years of age, reside in California, and have a registered account with the Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal, please contact us with the email address associated with your account and a statement that you reside in California.`,
      },
      {
        subHeading: "CCPA Privacy Notice",
        description: `This section applies only to California residents. Under the California Consumer Privacy Act (CCPA), you have rights including: Right to request deletion, Right to know about collected personal information, Right to access and correct personal information, and more.`,
      },
      {
        subHeading: "Colorado Residents",
        description: `This section applies only to Colorado residents. Under the Colorado Privacy Act (CPA), you have rights including: Right to access, correct, delete, obtain a copy of your personal data, and opt out of targeted advertising, sale of personal data, or profiling.`,
      },
      {
        subHeading: "Connecticut Residents",
        description: `This section applies only to Connecticut residents. Under the Connecticut Data Privacy Act (CTDPA), you have rights similar to Colorado residents, including access, correction, deletion, and opting out of targeted advertising, sale of personal data, or profiling.`,
      },
    ],
  },
  {
    title: "DO WE MAKE UPDATES TO THIS NOTICE?",
    id: "policyupdates",
    info: [
      {
        subHeading: "In Short",
        description: `Yes, we will update this notice as necessary to stay compliant with relevant laws.`,
      },
      {
        subHeading: "Updates to Privacy Notice",
        description: `We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date, and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.`,
      },
    ],
  },
  {
    title: "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    id: "contact",
    info: [
      {
        subHeading: "Contact Information",
        description: `If you have questions or comments about this notice, you may contact us by post at:`,
      },
      {
        subHeading: "Mailing Address",
        description: `FLOZABLE\n5363 Harwood Rd\nSan Jose, CA 95124\nUnited States`,
      },
    ],
  },
  {
    title:
      "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
    id: "request",
    info: [
      {
        subHeading: "Your Rights Regarding Personal Information",
        description: `Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it.`,
      },
      {
        subHeading: "Request to Review, Update, or Delete",
        description: `To request to review, update, or delete your personal information, please visit: https://flozable.com/dashboard/account.`,
      },
    ],
  },
];

export default function Terms() {
  return (
    <main>
      <div className="container pt-20 px-20">
        <section>
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="paragraph">Last updated December 28, 2024</p>
          <Separator />
          <p className="paragraph">
            {`This privacy notice for FLOZABLE ("we," "us," or "our"), describes
            how and why we might collect, store, use, and/or share ("process")
            your information when you use our services ("Services"), such as
            when you:`}
            <br />
            <br />
            - Visit our website at https://flozable.com, or any website of ours
            that links to this privacy notice.
            <br />
            - Engage with us in other related ways, including any sales,
            marketing, or events.
            <br />
            <br />
            Questions or concerns? Reading this privacy notice will help you
            understand your privacy rights and choices. If you do not agree with
            our policies and practices, please do not use our Services. If you
            still have any questions or concerns, please contact us at
            support@flozable.com.
          </p>
        </section>

        <section>
          <h2 className="section-heading">SUMMARY OF KEY POINTS</h2>
          <div>
            <p className="paragraph">
              This summary provides key points from our privacy notice, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our table of
              contents below to find the section you are looking for.
              <br />
              <br />
              What personal information do we process? When you visit, use, or
              navigate our Services, we may process personal information
              depending on how you interact with us and the Services, the
              choices you make, and the products and features you use. Learn
              more about personal information you disclose to us.
              <br /> <br />
              Do we process any sensitive personal information? We do not
              process sensitive personal information. <br /> <br />
              Do we receive any information from third parties? We do not
              receive any information from third parties. <br /> <br />
              How do we process your information? We process your information to
              provide, improve, and administer our Services, communicate with
              you, for security and fraud prevention, and to comply with law. We
              may also process your information for other purposes with your
              consent. We process your information only when we have a valid
              legal reason to do so. Learn more about how we process your
              information. <br /> <br />
              In what situations and with which parties do we share personal
              information? We may share information in specific situations and
              with specific third parties. Learn more about when and with whom
              we share your personal information. <br /> <br />
              How do we keep your information safe? We have organizational and
              technical processes and procedures in place to protect your
              personal information. However, no electronic transmission over the
              internet or information storage technology can be guaranteed to be
              100% secure, so we cannot promise or guarantee that hackers,
              cybercriminals, or other unauthorized third parties will not be
              able to defeat our security and improperly collect, access, steal,
              or modify your information. Learn more about how we keep your
              information safe. <br /> <br />
              What are your rights? Depending on where you are located
              geographically, the applicable privacy law may mean you have
              certain rights regarding your personal information. Learn more
              about your privacy rights.
            </p>
          </div>
        </section>

        <section id="toc">
          <h2 className="section-heading">TABLE OF CONTENTS</h2>
          <ol className="list-decimal list-inside space-y-1">
            {tocs.map((toc, i) => {
              return (
                <li key={i}>
                  <Link className="animated-underline" href={toc.link}>
                    {toc.name}
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        {contents.map((content, i) => {
          return (
            <section id={content.id} key={i}>
              <h2 className="section-heading">
                {i + 1}. {content.title}
              </h2>
              {content.info.map((info, i) => {
                return (
                  <div key={i}>
                    <h3 className="font-bold text-xl">{info?.subHeading}</h3>
                    <p className="paragraph">
                      {info.description.split(`<br />`).map((line, index) => (
                        <span key={index}>
                          {parser(line)}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </main>
  );
}
