"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import parser from "html-react-parser";

const contents1 = [
  {
    title: "What Are Cookies?",
    id: "what-are-cookies",
    info: [
      {
        description: `Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.`,
      },
      {
        description: `Cookies set by the website owner (in this case, FLOZABLE) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.`,
      },
    ],
  },
  {
    title: "Why Do We Use Cookies?",
    id: "why-do-we-use-cookies",
    info: [
      {
        description: `We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.`,
      },
      {
        description: `Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.`,
      },
      {
        description: `Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.`,
      },
    ],
  },
  {
    title: "How Can I Control Cookies?",
    id: "how-can-i-control-cookies",
    info: [
      {
        description: `You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.`,
      },
      {
        description: `If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.`,
      },
      {
        description: `You may also set or amend your web browser controls to accept or refuse cookies.`,
      },
    ],
  },
];

const contents2 = [
  {
    title: "How Can I Control Cookies on My Browser?",
    id: "how-can-i-control-cookies-browser",
    info: [
      {
        description: `As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. The following is information about how to manage cookies on the most popular browsers:`,
      },
      {
        description: `- Chrome\n- Internet Explorer\n- Firefox\n- Safari\n- Edge\n- Opera`,
      },
      {
        description: `In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:`,
      },
      {
        description: `- Digital Advertising Alliance\n- Digital Advertising Alliance of Canada\n- European Interactive Digital Advertising Alliance`,
      },
    ],
  },
  {
    title: "What About Other Tracking Technologies, Like Web Beacons?",
    id: "tracking-technologies",
    info: [
      {
        description: `Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them.`,
      },
      {
        description: `This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns.`,
      },
      {
        description: `In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.`,
      },
    ],
  },
  {
    title: "Do You Use Flash Cookies or Local Shared Objects?",
    id: "flash-cookies-lso",
    info: [
      {
        description: `Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention, and for other site operations.`,
      },
      {
        description: `If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the Website Storage Settings Panel.`,
      },
      {
        description: `You can also control Flash Cookies by going to the Global Storage Settings Panel and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies, how to prevent Flash LSOs from being placed on your computer without your being asked, and how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).`,
      },
      {
        description: `Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.`,
      },
    ],
  },
  {
    title: "Do You Serve Targeted Advertising?",
    id: "targeted-advertising",
    info: [
      {
        description: `Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in.`,
      },
      {
        description: `They may also employ technology that is used to measure the effectiveness of advertisements. They can accomplish this by using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you.`,
      },
      {
        description: `The information collected through this process does not enable us or them to identify your name, contact details, or other details that directly identify you unless you choose to provide these.`,
      },
    ],
  },
  {
    title: "How Often Will You Update This Cookie Policy?",
    id: "cookie-policy-updates",
    info: [
      {
        description: `We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.`,
      },
      {
        description: `The date at the top of this Cookie Policy indicates when it was last updated.`,
      },
    ],
  },
  {
    title: "Where Can I Get Further Information?",
    id: "further-information",
    info: [
      {
        description: `If you have any questions about our use of cookies or other technologies, please contact us at:`,
      },
      {
        description: `support@flozable.com`,
      },
    ],
  },
];

type Attribute = {
  name: string;
  detail: string;
};

type CookieInfoCardProps = {
  caption: string;
  attributes: Attribute[];
};

function CookieInfoCard({ caption, attributes }: CookieInfoCardProps) {
  return (
    <Card className="w-fit">
      <CardContent>
        <Table>
          <TableCaption>{caption}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Attribute</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((attr, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{attr.name}</TableCell>
                <TableCell className="text-right">{attr.detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function Cookies() {
  return (
    <main>
      <div className="container pt-20 px-20">
        <section>
          <h1 className="text-3xl font-bold mb-2">COOKIES</h1>
          <p className="paragraph">Last updated December 28, 2024</p>
          <Separator />
          <p className="paragraph">
            This Cookie Policy explains how FLOZABLE ( and &quot;our&quot;) uses
            cookies and similar technologies to recognize you when you visit our
            website at https://flozable.com (&quot;Website&quot;). It explains
            what these technologies are and why we use them, as well as your
            rights to control our use of them.
            <br /> <br />
            In some cases we may use cookies to collect personal information, or
            that becomes personal information if we combine it with other
            information.
          </p>
        </section>
        {contents1.map((content, i) => {
          return (
            <section id={content.id} key={i}>
              <h2 className="section-heading">
                {i + 1}. {content.title}
              </h2>
              {content.info.map((info, i) => {
                return (
                  <div key={i}>
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
        <section>
          <h2 className="section-heading">
            4. The specific types of cookies we use
          </h2>
          <div>
            <p className="paragraph">
              The specific types of first- and third-party cookies served
              through our Website and the purposes they perform are described in
              the table below (please note that the specific cookies served may
              vary depending on the specific Online Properties you visit):
              <br /> <br />
              Unclassified cookies: These are cookies that have not yet been
              categorized. We are in the process of classifying these cookies
              with the help of their providers.
            </p>

            <div className="flex gap-10">
              <CookieInfoCard
                caption="Stores login session info"
                attributes={[
                  { name: "Name", detail: "connect.sid" },
                  {
                    name: "Purpose",
                    detail: "Authentication and session management",
                  },
                  { name: "Provider", detail: "flozable.com" },
                  {
                    name: "Service",
                    detail: "Session handling for logged-in users",
                  },
                  { name: "Country", detail: "United States" },
                  { name: "Type", detail: "server_cookie" },
                  { name: "Expires in", detail: "Session" },
                ]}
              />

              <CookieInfoCard
                caption="Tracks which user is logged in"
                attributes={[
                  { name: "Name", detail: "userId" },
                  { name: "Purpose", detail: "Identifies the logged-in user" },
                  { name: "Provider", detail: "flozable.com" },
                  { name: "Service", detail: "User identification" },
                  { name: "Country", detail: "United States" },
                  { name: "Type", detail: "server_cookie" },
                  { name: "Expires in", detail: "Session" },
                ]}
              />
            </div>
          </div>
        </section>
        {contents2.map((content, i) => {
          return (
            <section id={content.id} key={i}>
              <h2 className="section-heading">
                {i + contents1.length + 2}. {content.title}
              </h2>
              {content.info.map((info, i) => {
                return (
                  <div key={i}>
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
