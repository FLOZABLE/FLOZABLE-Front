import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import parser from "html-react-parser";

const tocs = [
  { link: "#services", name: "OUR SERVICES" },
  { link: "#ip", name: "INTELLECTUAL PROPERTY RIGHTS" },
  { link: "#user-representations", name: "USER REPRESENTATIONS" },
  { link: "#user-registration", name: "USER REGISTRATION" },
  { link: "#prohibited-activities", name: "PROHIBITED ACTIVITIES" },
  {
    link: "#user-generated-contributions",
    name: "USER GENERATED CONTRIBUTIONS",
  },
  { link: "#contribution-license", name: "CONTRIBUTION LICENSE" },
  { link: "#guidelines-for-reviews", name: "GUIDELINES FOR REVIEWS" },
  { link: "#mobile-application-license", name: "MOBILE APPLICATION LICENSE" },
  { link: "#social-media", name: "SOCIAL MEDIA" },
  { link: "#services-management", name: "SERVICES MANAGEMENT" },
  { link: "#privacy-policy", name: "PRIVACY POLICY" },
  { link: "#term-and-termination", name: "TERM AND TERMINATION" },
  {
    link: "#modifications-and-interruptions",
    name: "MODIFICATIONS AND INTERRUPTIONS",
  },
  { link: "#governing-law", name: "GOVERNING LAW" },
  { link: "#dispute-resolution", name: "DISPUTE RESOLUTION" },
  { link: "#corrections", name: "CORRECTIONS" },
  { link: "#disclaimer", name: "DISCLAIMER" },
  { link: "#limitations-of-liability", name: "LIMITATIONS OF LIABILITY" },
  { link: "#indemnification", name: "INDEMNIFICATION" },
  { link: "#user-data", name: "USER DATA" },
  {
    link: "#electronic",
    name: "ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
  },
  {
    link: "#california-users-and-residents",
    name: "CALIFORNIA USERS AND RESIDENTS",
  },
  { link: "#miscellaneous", name: "MISCELLANEOUS" },
  { link: "#spotify-api-compliance", name: "Spotify API Compliance" },
  { link: "#contact-us", name: "CONTACT US" },
];

const contents = [
  {
    title: "OUR SERVICES",
    id: "services",
    info: [
      {
        subHeading: "",
        description: `The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.<br />Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.`,
      },
    ],
  },
  {
    title: "INTELLECTUAL PROPERTY RIGHTS",
    id: "ip",
    info: [
      {
        subHeading: "Our intellectual property",
        description: `We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").<br /><br />Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.<br /><br />The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.`,
      },
      {
        subHeading: "Your use of our Services",
        description: `Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:<br /><br />access the Services; and<br />download or print a copy of any portion of the Content to which you have properly gained access,<br /><br />solely for your personal, non-commercial use or internal business purpose.<br /><br />Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.<br /><br />If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: contact@flozable.com. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.<br /><br />We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.<br /><br />Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.`,
      },
      {
        subHeading: "Your submissions and contributions",
        description: `Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.<br /><br /><strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.<br /><br /><strong>Contributions:</strong> The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material ("Contributions"). Any Submission that is publicly posted shall also be treated as a Contribution.<br /><br />You understand that Contributions may be viewable by other users of the Services.<br /><br /><strong>When you post Contributions, you grant us a license (including use of your name, trademarks, and logos):</strong> By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to: use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your Contributions (including, without limitation, your image, name, and voice) for any purpose, commercial, advertising, or otherwise, to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicense the licenses granted in this section. Our use and distribution may occur in any media formats and through any media channels.<br /><br />This license includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.<br /><br /><strong>You are responsible for what you post or upload:</strong> By sending us Submissions and/or posting Contributions through any part of the Services or making Contributions accessible through the Services by linking your account through the Services to any of your social networking accounts, you:<br /><br />- confirm that you have read and agree with our "PROHIBITED ACTIVITIES" and will not post, send, publish, upload, or transmit through the Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;<br />- to the extent permissible by applicable law, waive any and all moral rights to any such Submission and/or Contribution;<br />- warrant that any such Submission and/or Contributions are original to you or that you have the necessary rights and licenses to submit such Submissions and/or Contributions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions and/or Contributions; and<br />- warrant and represent that your Submissions and/or Contributions do not constitute confidential information.<br /><br />You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party's intellectual property rights, or (c) applicable law.<br /><br /><strong>We may remove or edit your Content:</strong> Although we have no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without notice if in our reasonable opinion we consider such Contributions harmful or in breach of these Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report you to the authorities.`,
      },
    ],
  },
  {
    title: "USER REPRESENTATIONS",
    id: "user-representations",
    info: [
      {
        subHeading: "",
        description: `By using the Services, you represent and warrant that: 
        (1) all registration information you submit will be true, accurate, current, and complete; 
        (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; 
        (3) you have the legal capacity and you agree to comply with these Legal Terms; 
        (4) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services; 
        (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; 
        (6) you will not use the Services for any illegal or unauthorized purpose; and 
        (7) your use of the Services will not violate any applicable law or regulation.<br /><br />
        If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).`,
      },
    ],
  },
  {
    title: "USER REGISTRATION",
    id: "user-registration",
    info: [
      {
        subHeading: "",
        description: `You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password.<br /><br />
        We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.`,
      },
    ],
  },
  {
    title: "PROHIBITED ACTIVITIES",
    id: "prohibited-activities",
    info: [
      {
        subHeading: "",
        description: `You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.<br /><br />
        As a user of the Services, you agree not to:<br /><br />
        • Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.<br />
        • Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.<br />
        • Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.<br />
        • Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.<br />
        • Use any information obtained from the Services in order to harass, abuse, or harm another person.<br />
        • Make improper use of our support services or submit false reports of abuse or misconduct.<br />
        • Use the Services in a manner inconsistent with any applicable laws or regulations.<br />
        • Engage in unauthorized framing of or linking to the Services.<br />
        • Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.<br />
        • Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.<br />
        • Delete the copyright or other proprietary rights notice from any Content.<br />
        • Attempt to impersonate another user or person or use the username of another user.<br />
        • Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats "gifs", 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").<br />
        • Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.<br />
        • Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.<br />
        • Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.<br />
        • Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.<br />
        • Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.<br />
        • Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.<br />
        • Use a buying agent or purchasing agent to make purchases on the Services.<br />
        • Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.<br />
        • Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.<br />
        • Use the Services to advertise or offer to sell goods and services.`,
      },
    ],
  },
  {
    title: "USER GENERATED CONTRIBUTIONS",
    id: "user-generated-contributions",
    info: [
      {
        subHeading: "Personal information you disclose to us",
        description: `The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:<br /><br />
        • The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.<br />
        • You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.<br />
        • You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.<br />
        • Your Contributions are not false, inaccurate, or misleading.<br />
        • Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.<br />
        • Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).<br />
        • Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.<br />
        • Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or className of people.<br />
        • Your Contributions do not violate any applicable law, regulation, or rule.<br />
        • Your Contributions do not violate the privacy or publicity rights of any third party.<br />
        • Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.<br />
        • Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.<br />
        • Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.<br /><br />
        Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.`,
      },
    ],
  },
  {
    title: "CONTRIBUTION LICENSE",
    id: "contribution-license",
    info: [
      {
        subHeading: "",
        description: `By posting your Contributions to any part of the Services or making Contributions accessible to the Services by linking your account from the Services to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.<br /><br />
        This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.<br /><br />
        We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.<br /><br />
        We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.`,
      },
    ],
  },
  {
    title: "GUIDELINES FOR REVIEWS",
    id: "guidelines-for-reviews",
    info: [
      {
        subHeading: "",
        description: `We may provide you areas on the Services to leave reviews or ratings. When posting a review, you must comply with the following criteria:<br />
        (1) you should have firsthand experience with the person/entity being reviewed;<br />
        (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language;<br />
        (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability;<br />
        (4) your reviews should not contain references to illegal activity;<br />
        (5) you should not be affiliated with competitors if posting negative reviews;<br />
        (6) you should not make any conclusions as to the legality of conduct;<br />
        (7) you may not post any false or misleading statements; and<br />
        (8) you may not organize a campaign encouraging others to post reviews, whether positive or negative.<br /><br />
        We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate. Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our affiliates or partners. We do not assume liability for any review or for any claims, liabilities, or losses resulting from any review.<br /><br />
        By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide, royalty-free, fully paid, assignable, and sublicensable right and license to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content relating to reviews.`,
      },
    ],
  },
  {
    title: "MOBILE APPLICATION LICENSE",
    id: "mobile-application-license",
    info: [
      {
        subHeading: "",
        description: `Use License<br />
        If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use the App on such devices strictly in accordance with the terms and conditions of this mobile application license contained in these Legal Terms. You shall not:<br />
        (1) except as permitted by applicable law, decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the App;<br />
        (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App;<br />
        (3) violate any applicable laws, rules, or regulations in connection with your access or use of the App;<br />
        (4) remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the App;<br />
        (5) use the App for any revenue-generating endeavor, commercial enterprise, or other purpose for which it is not designed or intended;<br />
        (6) make the App available over a network or other environment permitting access or use by multiple devices or users at the same time;<br />
        (7) use the App for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the App;<br />
        (8) use the App to send automated queries to any website or to send any unsolicited commercial email;<br />
        (9) use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the App.<br /><br />
        
        Apple and Android Devices<br />
        The following terms apply when you use the App obtained from either the Apple Store or Google Play (each an "App Distributor") to access the Services:<br />
        (1) the license granted to you for our App is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service;<br />
        (2) we are responsible for providing any maintenance and support services with respect to the App as specified in the terms and conditions of this mobile application license contained in these Legal Terms or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the App;<br />
        (3) in the event of any failure of the App to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, may refund the purchase price, if any, paid for the App, and to the maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever with respect to the App;<br />
        (4) you represent and warrant that (i) you are not located in a country that is subject to a US government embargo, or that has been designated by the US government as a "terrorist supporting" country and (ii) you are not listed on any US government list of prohibited or restricted parties;<br />
        (5) you must comply with applicable third-party terms of agreement when using the App, e.g., if you have a VoIP application, then you must not be in violation of their wireless data service agreement when using the App;<br />
        (6) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application license contained in these Legal Terms, and that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile application license contained in these Legal Terms against you as a third-party beneficiary thereof.`,
      },
    ],
  },

  {
    title: "SOCIAL MEDIA",
    id: "social-media",
    info: [
      {
        subHeading: "",
        description: `As part of the functionality of the Services, you may link your account with online accounts you have with third-party service providers (each such account, a "Third-Party Account") by either:<br />
        (1) providing your Third-Party Account login information through the Services; or <br />
        (2) allowing us to access your Third-Party Account, as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account.<br />
        You represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern your use of the applicable Third-Party Account, and without obligating us to pay any fees or making us subject to any usage limitations imposed by the third-party service provider of the Third-Party Account.<br /><br />
        
        By granting us access to any Third-Party Accounts, you understand that:<br />
        (1) we may access, make available, and store (if applicable) any content that you have provided to and stored in your Third-Party Account (the "Social Network Content") so that it is available on and through the Services via your account, including without limitation any friend lists and<br />
        (2) we may submit to and receive from your Third-Party Account additional information to the extent you are notified when you link your account with the Third-Party Account.<br /><br />
        
        Depending on the Third-Party Accounts you choose and subject to the privacy settings that you have set in such Third-Party Accounts, personally identifiable information that you post to your Third-Party Accounts may be available on and through your account on the Services. Please note that if a Third-Party Account or associated service becomes unavailable or our access to such Third-Party Account is terminated by the third-party service provider, then Social Network Content may no longer be available on and through the Services. You will have the ability to disable the connection between your account on the Services and your Third-Party Accounts at any time.<br /><br />

        PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any Social Network Content for any purpose, including but not limited to, for accuracy, legality, or non-infringement, and we are not responsible for any Social Network Content.<br /><br />
        
        You acknowledge and agree that we may access your email address book associated with a Third-Party Account and your contacts list stored on your mobile device or tablet computer solely for purposes of identifying and informing you of those contacts who have also registered to use the Services. You can deactivate the connection between the Services and your Third-Party Account by contacting us using the contact information below or through your account settings (if applicable). We will attempt to delete any information stored on our servers that was obtained through such Third-Party Account, except the username and profile picture that become associated with your account.`,
      },
    ],
  },
  {
    title: "SERVICES MANAGEMENT",
    id: "services-management",
    info: [
      {
        subHeading: "",
        description: `We reserve the right, but not the obligation, to:<br />
        (1) monitor the Services for violations of these Legal Terms;<br />
        (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities;<br />
        (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;<br />
        (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and<br />
        (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.`,
      },
    ],
  },
  {
    title: "PRIVACY POLICY",
    id: "privacy-policy",
    info: [
      {
        subHeading: "",
        description: `We care about data privacy and security. Please review our Privacy Policy. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.`,
      },
    ],
  },
  {
    title: "TERM AND TERMINATION",
    id: "term-and-termination",
    info: [
      {
        subHeading: "",
        description: `These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.<br /><br />
        
        If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.`,
      },
    ],
  },
  {
    title: "Modifications and Interruptions",
    id: "modifications-and-interruptions",
    info: [
      {
        subHeading: "Right to Modify Services",
        description: `We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.`,
      },
      {
        subHeading: "Service Availability",
        description: `We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services.`,
      },
      {
        subHeading: "No Obligation for Maintenance or Updates",
        description: `Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.`,
      },
    ],
  },
  {
    title: "Governing Law",
    id: "governing-law",
    info: [
      {
        subHeading: "",
        description: `These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of California applicable to agreements made and to be entirely performed within the State of California, without regard to its conflict of law principles.`,
      },
    ],
  },
  {
    title: "Dispute Resolution",
    id: "dispute-resolution",
    info: [
      {
        subHeading: "",
        description: `Binding Arbitration<br />
        If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by binding arbitration. You understand that without this provision, you would have the right to sue in court and have a jury trial. The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association "AAA" and, where appropriate, the AAA’s Supplementary Procedures for Consumer Related Disputes "AAA Consumer Rules", both of which are available at the American Arbitration Association (AAA) website. Your arbitration fees and your share of arbitrator compensation shall be governed by the AAA Consumer Rules and, where appropriate, limited by the AAA Consumer Rules. If such costs are determined by the arbitrator to be excessive, we will pay all arbitration fees and expenses. The arbitration may be conducted in person, through the submission of documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by either Party. The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so. Except where otherwise required by the applicable AAA rules or applicable law, the arbitration will take place in California. Except as otherwise provided herein, the Parties may litigate in court to compel arbitration, stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on the award entered by the arbitrator.<br /><br />
        
        If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in the state and federal courts located in California, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction, and forum non conveniens with respect to venue and jurisdiction in such state and federal courts. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Legal Terms.<br /><br />
        
        If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.<br /><br />

        Restrictions<br />
        The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.<br /><br />

        Exceptions to Arbitration<br />
        The Parties agree that the following Disputes are not subject to the above provisions concerning binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.`,
      },
    ],
  },
  {
    title: "Corrections",
    id: "corrections",
    info: [
      {
        subHeading: "",
        description: `There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.`,
      },
    ],
  },
  {
    title: "Disclaimer",
    id: "disclaimer",
    info: [
      {
        subHeading: "",
        description: `The Services are provided on an "as-is" and "as-available" basis. You agree that your use of the Services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the Services and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranties or representations about the accuracy or completeness of the Services' content or the content of any websites or mobile applications linked to the Services and we will assume no liability or responsibility for any (1) errors, mistakes, or inaccuracies of content and materials, (2) personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the Services, (3) any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein, (4) any interruption or cessation of transmission to or from the Services, (5) any bugs, viruses, Trojan horses, or the like which may be transmitted to or through the Services by any third party, and/or (6) any errors or omissions in any content and materials or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the Services. We do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the Services, any hyperlinked website, or any website or mobile application featured in any banner or other advertising, and we will not be a party to or in any way be responsible for monitoring any transaction between you and any third-party providers of products or services. As with the purchase of a product or service through any medium or in any environment, you should use your best judgment and exercise caution where appropriate.`,
      },
    ],
  },
  {
    title: "LIMITATIONS OF LIABILITY",
    id: "limitations-of-liability",
    info: [
      {
        subHeading: "",
        description: `IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.`,
      },
    ],
  },
  {
    title: "INDEMNIFICATION",
    id: "indemnification",
    info: [
      {
        subHeading: "",
        description: `You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.`,
      },
    ],
  },
  {
    title: "USER DATA",
    id: "user-data",
    info: [
      {
        subHeading: "",
        description: `We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.`,
      },
    ],
  },
  {
    title: "ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
    id: "electronic",
    info: [
      {
        subHeading: "",
        description: `Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.`,
      },
    ],
  },
  {
    title: "CALIFORNIA USERS AND RESIDENTS",
    id: "california-users-and-residents",
    info: [
      {
        subHeading: "",
        description: `If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.`,
      },
    ],
  },
  {
    title: "MISCELLANEOUS",
    id: "miscellaneous",
    info: [
      {
        subHeading: "",
        description: `These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.`,
      },
    ],
  },
  {
    title: "Spotify API Compliance",
    id: "spotify-api-compliance",
    info: [
      {
        subHeading: "FLOZABLE Privacy and Security Commitment",
        description: `FLOZABLE is committed to protecting the privacy and security of user data. Our use and transfer of information received from Spotify APIs will adhere to the Spotify Developer Policy, ensuring that user data is accessed, stored, and used only to provide and enhance our services. We do not share this data with third parties without explicit user consent.`,
      },
      {
        subHeading: "Limited Use Policy Disclosure",
        description: `FLOZABLE’s use and transfer of information received from Spotify APIs will comply with Spotify’s Developer Terms and Policies. We only access the necessary data to display and manage user playlists within our app. We do not transfer user data to external services without explicit consent and do not use it for advertising or resale purposes.`,
      },
      {
        subHeading: "Data Sharing and User Consent",
        description: `To provide seamless integration with Spotify, FLOZABLE may access and display user playlists. This data access is strictly limited to functionality related to playlist management and display. If we ever need to share data with external services to improve user experience, this will only occur after obtaining explicit user consent. Users will be given the choice to opt-in or opt-out of such data sharing at any time.`,
      },
      {
        subHeading: "User Control and Data Access",
        description: `Users have full control over their Spotify data within FLOZABLE. You can manage your data-sharing preferences and revoke access by visiting your Spotify account settings. If you wish to disconnect FLOZABLE from your Spotify account, you can do so via Spotify’s Authorized Applications settings at any time.`,
      },
      {
        subHeading: "How Do You Exercise Your Rights?",
        description: `The easiest way to exercise your rights is by visiting your account settings or by contacting us directly. We will consider and act upon any request in accordance with applicable data protection laws.`,
      },
    ],
  },
  {
    title: "CONTACT US",
    id: "contact-us",
    info: [
      {
        subHeading: "",
        description: `In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at: support@flozable.com`,
      },
    ],
  },
];

export default function Terms() {
  return (
    <main>
      <div className="container pt-20 px-20">
        <section>
          <h1 className="text-3xl font-bold mb-2">TERMS OF SERVICE</h1>
          <p className="paragraph">Last updated December 28, 2024</p>
          <Separator />
          <p className="paragraph">
            We are FLOZABLE (&quot;<strong>Company</strong>&quot;
            <strong>we</strong>,&quot; &quot;<strong>us</strong>&quot;
            <strong>our</strong>&quot;).
            <br />
            <br />
            We operate the website https://flozable.com (the &quot;
            <strong>Site</strong>&quot;), the mobile application FLOZABLE (the
            &quot;
            <strong>App</strong>&quot;), as well as any other related products
            and services that refer or link to these legal terms (the &quot;
            <strong>Legal Terms</strong>&quot;) (collectively, the &quot;
            <strong>Services</strong>&quot; ).
            <br />
            <br />
            FLOZABLE is a platform designed to foster collaborative learning,
            time management, and community engagement.
            <br />
            <br />
            You can contact us by email at contact@flozable.com or by mail to
            San Jose, CA 95124, San Jose, CA 95124, United States .
            <br />
            <br />
            These Legal Terms constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity (&quot;
            <strong>you</strong>&quot;), and FLOZABLE, concerning your access to
            and use of the Services. You agree that by accessing the Services,
            you have read, understood, and agreed to be bound by all of these
            Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN
            YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
            DISCONTINUE USE IMMEDIATELY.
            <br />
            <br />
            We will provide you with prior notice of any scheduled changes to
            the Services you are using. The modified Legal Terms will become
            effective upon posting or notifying you by info@flozable.com, as
            stated in the email message. By continuing to use the Services after
            the effective date of any changes, you agree to be bound by the
            modified terms.
            <br />
            <br />
            All users who are minors in the jurisdiction in which they reside
            (generally under the age of 18) must have the permission of, and be
            directly supervised by, their parent or guardian to use the
            Services. If you are a minor, you must have your parent or guardian
            read and agree to these Legal Terms prior to you using the Services.
            <br />
            <br />
            We recommend that you print a copy of these Legal Terms for your
            records.
          </p>
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
