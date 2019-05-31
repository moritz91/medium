import * as React from "react";
import Layout from "../components/layout";
import { Heading, Card, Box, Text } from "rebass";
import styled from "styled-components";

export const UnorderedList = styled.ul`
  list-item-style: none;
`;

export const OrderedList = styled.ol``;

export const ListItem = styled.li``;

export default class ToS extends React.PureComponent {
  render() {
    return (
      <Layout title={`Terms of Service`}>
        <Card pb={2}>
          <Heading fontSize={30} mb={10} mt={"0px"} mx={"0px"}>
            Terms of Service
          </Heading>
          <Box fontSize={15}>
            <Text pb={10}>
              Thank you for using medium! We're happy you're here. Please read
              this Terms of Service agreement carefully before accessing or
              using medium. Because it is such an important contract between us
              and our users, we have tried to make it as clear as possible. For
              your convenience, we have presented these terms in a short
              non-binding summary followed by the full legal terms.
            </Text>
          </Box>
        </Card>
        <Card>
          <Box fontSize={15}>
            <Heading fontSize={30} mb={10} mt={"0px"} mx={"0px"}>
              The Medium Terms of Service
            </Heading>
            <Heading>Effective date: April 19, 2019 A.</Heading>
            <Heading fontSize={20}>A. Definitions</Heading>
            <Text>
              Short version: We use these basic terms throughout the agreement,
              and they have specific meanings. You should know what we mean when
              we use each of the terms. There's not going to be a test on it,
              but it's still useful information.
            </Text>
            <Text>
              The “Agreement” refers, collectively, to all the terms,
              conditions, notices contained or referenced in this document (the
              “Terms of Service” or the "Terms") and all other operating rules,
              policies (including the medium Privacy Statement, available at
              github.com/site/privacy) and procedures that we may publish from
              time to time on the Website. Most of our site policies are
              available at help.github.com/categories/site-policy. The “Service”
              refers to the applications, software, products, and services
              provided by medium. The “Website” refers to medium’s website
              located at github.com, and all content, services, and products
              provided by medium at or through the Website. It also refers to
              medium-owned subdomains of github.com, such as
              education.github.com and pages.github.com. These Terms also govern
              medium’s conference websites, such as githubuniverse.com, and
              product websites, such as atom.io. Occasionally, websites owned by
              medium may provide different or additional terms of service. If
              those additional terms conflict with this Agreement, the more
              specific terms apply to the relevant page or service. “The User,”
              “You,” and “Your” refer to the individual person, company, or
              organization that has visited or is using the Website or Service;
              that accesses or uses any part of the Account; or that directs the
              use of the Account in the performance of its functions. A User
              must be at least 13 years of age. Special terms may apply for
              business or government Accounts (See Section B(5): Additional
              Terms). “medium,” “We,” and “Us” refer to medium, Inc., as well as
              our affiliates, directors, subsidiaries, contractors, licensors,
              officers, agents, and employees. “Content” refers to content
              featured or displayed through the Website, including without
              limitation text, data, articles, images, photographs, graphics,
              software, applications, designs, features, and other materials
              that are available on the Website or otherwise available through
              the Service. "Content" also includes Services. “User-Generated
              Content” is Content, written or otherwise, created or uploaded by
              our Users. "Your Content" is Content that you create or own. An
              "Account" represents your legal relationship with medium. A “User
              Account” represents an individual User’s authorization to log in
              to and use the Service and serves as a User’s identity on medium.
              “Organizations” are shared workspaces that may be associated with
              a single entity or with one or more Users where multiple Users can
              collaborate across many projects at once. A User Account can be a
              member of any number of Organizations. B. Account Terms Short
              version: User Accounts and Organizations have different
              administrative controls; a human must create your Account; you
              must be 13 or over; you must provide a valid email address; and
              you may not have more than one free Account. You alone are
              responsible for your Account and anything that happens while you
              are signed in to or using your Account. You are responsible for
              keeping your Account secure. 1. Account Controls Users. Subject to
              these Terms, you retain ultimate administrative control over your
              User Account and the Content within it. Organizations. The "owner"
              of an Organization that was created under these Terms has ultimate
              administrative control over that Organization and the Content
              within it. Within the Service, an owner can manage User access to
              the Organization’s data and projects. An Organization may have
              multiple owners, but there must be at least one User Account
              designated as an owner of an Organization. If you are the owner of
              an Organization under these Terms, we consider you responsible for
              the actions that are performed on or through that Organization. 2.
              Required Information You must provide a valid email address in
              order to complete the signup process. Any other information
              requested, such as your real name, is optional, unless you are
              accepting these terms on behalf of a legal entity (in which case
              we need more information about the legal entity) or if you opt for
              a paid Account, in which case additional information will be
              necessary for billing purposes. 3. Account Requirements We have a
              few simple rules for User Accounts on medium's Service. You must
              be a human to create an Account. Accounts registered by "bots" or
              other automated methods are not permitted. We do permit machine
              accounts: A machine account is an Account set up by an individual
              human who accepts the Terms on behalf of the Account, provides a
              valid email address, and is responsible for its actions. A machine
              account is used exclusively for performing automated tasks.
              Multiple users may direct the actions of a machine account, but
              the owner of the Account is ultimately responsible for the
              machine's actions. You may maintain no more than one free machine
              account in addition to your free User Account. One person or legal
              entity may maintain no more than one free Account (if you choose
              to control a machine account as well, that's fine, but it can only
              be used for running a machine). You must be age 13 or older. While
              we are thrilled to see brilliant young coders get excited by
              learning to program, we must comply with United States law. medium
              does not target our Service to children under 13, and we do not
              permit any Users under 13 on our Service. If we learn of any User
              under the age of 13, we will terminate that User’s Account
              immediately. If you are a resident of a country outside the United
              States, your country’s minimum age may be older; in such a case,
              you are responsible for complying with your country’s laws. Your
              login may only be used by one person — i.e., a single login may
              not be shared by multiple people. A paid Organization may only
              provide access to as many User Accounts as your subscription
              allows. You may not use medium in violation of export control or
              sanctions laws of the United States or any other applicable
              jurisdiction. You may not use medium if you are or are working on
              behalf of a Specially Designated National (SDN) or a person
              subject to similar blocking or denied party prohibitions
              administered by a U.S. government agency. medium may allow persons
              in certain sanctioned countries or territories to access certain
              medium services pursuant to U.S. government authorizations. For
              more information, please see our Export Controls policy. 4. User
              Account Security You are responsible for keeping your Account
              secure while you use our Service. We offer tools such as
              two-factor authentication to help you maintain your Account's
              security, but the content of your Account and its security are up
              to you. You are responsible for all content posted and activity
              that occurs under your Account (even when content is posted by
              others who have Accounts under your Account). You are responsible
              for maintaining the security of your Account and password. medium
              cannot and will not be liable for any loss or damage from your
              failure to comply with this security obligation. You will promptly
              notify medium if you become aware of any unauthorized use of, or
              access to, our Service through your Account, including any
              unauthorized use of your password or Account. 5. Additional Terms
              In some situations, third parties' terms may apply to your use of
              medium. For example, you may be a member of an organization on
              medium with its own terms or license agreements; you may download
              an application that integrates with medium; or you may use medium
              to authenticate to another service. Please be aware that while
              these Terms are our full agreement with you, other parties' terms
              govern their relationships with you. If you are a government User
              or otherwise accessing or using any medium Service in a government
              capacity, this Government Amendment to medium Terms of Service
              applies to you, and you agree to its provisions. If you have
              signed up for medium Enterprise Cloud, the Enterprise Cloud
              Addendum applies to you, and you agree to its provisions. C.
              Acceptable Use Short version: medium hosts a wide variety of
              collaborative projects from all over the world, and that
              collaboration only works when our users are able to work together
              in good faith. While using the service, you must follow this
              Acceptable Use Policy, which includes some restrictions on content
              you can post, conduct on the service, and other limitations. In
              short, be excellent to each other. 1. Compliance with Laws and
              Regulations Your use of the Website and Service must not violate
              any applicable laws, including copyright or trademark laws, export
              control or sanctions laws, or other laws in your jurisdiction. You
              are responsible for making sure that your use of the Service is in
              compliance with laws and any applicable regulations. 2. Content
              Restrictions You agree that you will not under any circumstances
              upload, post, host, or transmit any content that: is unlawful or
              promotes unlawful activities; is or contains sexually obscene
              content; is libelous, defamatory, or fraudulent; is discriminatory
              or abusive toward any individual or group; gratuitously depicts or
              glorifies violence, including violent images; contains or installs
              any active malware or exploits, or uses our platform for exploit
              delivery (such as part of a command and control system); or
              infringes on any proprietary right of any party, including patent,
              trademark, trade secret, copyright, right of publicity, or other
              rights. 3. Conduct Restrictions While using medium, you agree that
              you will not under any circumstances: harass, abuse, threaten, or
              incite violence towards any individual or group, including medium
              employees, officers, and agents, or other medium Users; use our
              servers for any form of excessive automated bulk activity (for
              example, spamming), or relay any other form of unsolicited
              advertising or solicitation through our servers, such as
              get-rich-quick schemes; attempt to disrupt or tamper with medium's
              servers in ways that could harm our Website or Service, to place
              undue burden on medium's servers through automated means, or to
              access medium's Service in ways that exceed your authorization
              (other than those authorized by the medium Bug Bounty program);
              impersonate any person or entity, including any of our employees
              or representatives, including through false association with
              medium, or by fraudulently misrepresenting your identity or site's
              purpose; or violate the privacy of any third party, such as by
              posting another person's personal information without consent. 4.
              Services Usage Limits You agree not to reproduce, duplicate, copy,
              sell, resell or exploit any portion of the Service, use of the
              Service, or access to the Service without medium's express written
              permission. 5. Scraping Scraping refers to extracting data from
              our Website via an automated process, such as a bot or webcrawler.
              It does not refer to the collection of information through
              medium's API. Please see Section H for our API Terms. You may
              scrape the website for the following reasons: Researchers may
              scrape public, non-personal information from medium for research
              purposes, only if any publications resulting from that research
              are open access. Archivists may scrape medium for public data for
              archival purposes. You may not scrape medium for spamming
              purposes, including for the purposes of selling medium users'
              personal information, such as to recruiters, headhunters, and job
              boards. All use of medium data gathered through scraping must
              comply with the medium Privacy Statement. 6. Privacy Misuse of
              medium Users' Personal Information is prohibited. Any person,
              entity, or service collecting data from medium must comply with
              the medium Privacy Statement, particularly in regards to the
              collection of our Users' Personal Information (as defined in the
              medium Privacy Statement). If you collect any medium User's
              Personal Information from medium, you agree that you will only use
              the Personal Information you gather for the purpose for which our
              User has authorized it. You agree that you will reasonably secure
              any Personal Information you have gathered from medium, and you
              will respond promptly to complaints, removal requests, and "do not
              contact" requests from medium or medium Users. 7. Excessive
              Bandwidth Use If we determine your bandwidth usage to be
              significantly excessive in relation to other medium customers, we
              reserve the right to suspend your Account or throttle your file
              hosting until you can reduce your bandwidth consumption. 8. User
              Protection You agree not to engage in activity that significantly
              harms our Users. We will resolve disputes in favor of protecting
              our Users as a whole. D. User-Generated Content Short version: You
              own content you create, but you allow us certain rights to it, so
              that we can display and share the content you post. You still have
              control over your content, and responsibility for it, and the
              rights you grant us are limited to those we need to provide the
              service. We have the right to remove content or close Accounts if
              we need to. 1. Responsibility for User-Generated Content You may
              create or upload User-Generated Content while using the Service.
              You are solely responsible for the content of, and for any harm
              resulting from, any User-Generated Content that you post, upload,
              link to or otherwise make available via the Service, regardless of
              the form of that Content. We are not responsible for any public
              display or misuse of your User-Generated Content. 2. medium May
              Remove Content We do not pre-screen User-Generated Content, but we
              have the right (though not the obligation) to refuse or remove any
              User-Generated Content that, in our sole discretion, violates any
              medium terms or policies. 3. Ownership of Content, Right to Post,
              and License Grants You retain ownership of and responsibility for
              Your Content. If you're posting anything you did not create
              yourself or do not own the rights to, you agree that you are
              responsible for any Content you post; that you will only submit
              Content that you have the right to post; and that you will fully
              comply with any third party licenses relating to Content you post.
              Because you retain ownership of and responsibility for Your
              Content, we need you to grant us — and other medium Users —
              certain legal permissions, listed in Sections D.4 — D.7. These
              license grants apply to Your Content. If you upload Content that
              already comes with a license granting medium the permissions we
              need to run our Service, no additional license is required. You
              understand that you will not receive any payment for any of the
              rights granted in Sections D.4 — D.7. The licenses you grant to us
              will end when you remove Your Content from our servers, unless
              other Users have forked it. 4. License Grant to Us We need the
              legal right to do things like host Your Content, publish it, and
              share it. You grant us and our legal successors the right to
              store, parse, and display Your Content, and make incidental copies
              as necessary to render the Website and provide the Service. This
              includes the right to do things like copy it to our database and
              make backups; show it to you and other users; parse it into a
              search index or otherwise analyze it on our servers; share it with
              other users; and perform it, in case Your Content is something
              like music or video. This license does not grant medium the right
              to sell Your Content or otherwise distribute or use it outside of
              our provision of the Service. 5. License Grant to Other Users Any
              User-Generated Content you post publicly, including issues,
              comments, and contributions to other Users' repositories, may be
              viewed by others. By setting your repositories to be viewed
              publicly, you agree to allow others to view and "fork" your
              repositories (this means that others may make their own copies of
              Content from your repositories in repositories they control). If
              you set your pages and repositories to be viewed publicly, you
              grant each User of medium a nonexclusive, worldwide license to
              use, display, and perform Your Content through the medium Service
              and to reproduce Your Content solely on medium as permitted
              through medium's functionality (for example, through forking). You
              may grant further rights if you adopt a license. If you are
              uploading Content you did not create or own, you are responsible
              for ensuring that the Content you upload is licensed under terms
              that grant these permissions to other medium Users. 6.
              Contributions Under Repository License Whenever you make a
              contribution to a repository containing notice of a license, you
              license your contribution under the same terms, and you agree that
              you have the right to license your contribution under those terms.
              If you have a separate agreement to license your contributions
              under different terms, such as a contributor license agreement,
              that agreement will supersede. Isn't this just how it works
              already? Yep. This is widely accepted as the norm in the
              open-source community; it's commonly referred to by the shorthand
              "inbound=outbound". We're just making it explicit. 7. Moral Rights
              You retain all moral rights to Your Content that you upload,
              publish, or submit to any part of the Service, including the
              rights of integrity and attribution. However, you waive these
              rights and agree not to assert them against us, to enable us to
              reasonably exercise the rights granted in Section D.4, but not
              otherwise. To the extent this agreement is not enforceable by
              applicable law, you grant medium the rights we need to use Your
              Content without attribution and to make reasonable adaptations of
              Your Content as necessary to render the Website and provide the
              Service. E. Private Repositories Short version: You may have
              access to private repositories. We treat the content of private
              repositories as confidential, and we only access it for support
              reasons, with your consent, or if required to for security
              reasons. 1. Control of Private Repositories. Some Accounts may
              have private repositories, which allow the User to control access
              to Content. 2. Confidentiality of Private Repositories. medium
              considers the contents of private repositories to be confidential
              to you. medium will protect the contents of private repositories
              from unauthorized use, access, or disclosure in the same manner
              that we would use to protect our own confidential information of a
              similar nature and in no event with less than a reasonable degree
              of care. 3. Access. medium employees may only access the content
              of your private repositories in the following situations: With
              your consent and knowledge, for support reasons. If medium
              accesses a private repository for support reasons, we will only do
              so with the owner’s consent and knowledge. When access is required
              for security reasons, including when access is required to
              maintain ongoing confidentiality, integrity, availability and
              resilience of medium's systems and Service. You may choose to
              enable additional access to your private repositories. For
              example: You may enable various medium services or features that
              require additional rights to Your Content in private repositories.
              These rights may vary depending on the service or feature, but
              medium will continue to treat your private repository Content as
              confidential. If those services or features require rights in
              addition to those we need to provide the medium Service, we will
              provide an explanation of those rights. 4. Exclusions. If we have
              reason to believe the contents of a private repository are in
              violation of the law or of these Terms, we have the right to
              access, review, and remove them. Additionally, we may be compelled
              by law to disclose the contents of your private repositories. F.
              Copyright Infringement and DMCA Policy If you believe that content
              on our website violates your copyright, please contact us in
              accordance with our Digital Millennium Copyright Act Policy. If
              you are a copyright owner and you believe that content on medium
              violates your rights, please contact us via our convenient DMCA
              form or by emailing copyright@github.com. There may be legal
              consequences for sending a false or frivolous takedown notice.
              Before sending a takedown request, you must consider legal uses
              such as fair use and licensed uses. We will terminate the Accounts
              of repeat infringers of this policy. G. Intellectual Property
              Notice Short version: We own the service and all of our content.
              In order for you to use our content, we give you certain rights to
              it, but you may only use our content in the way we have allowed.
              1. medium's Rights to Content medium and our licensors, vendors,
              agents, and/or our content providers retain ownership of all
              intellectual property rights of any kind related to the Website
              and Service. We reserve all rights that are not expressly granted
              to you under this Agreement or by law. The look and feel of the
              Website and Service is copyright © medium, Inc. All rights
              reserved. You may not duplicate, copy, or reuse any portion of the
              HTML/CSS, Javascript, or visual design elements or concepts
              without express written permission from medium. 2. medium
              Trademarks and Logos If you’d like to use medium’s trademarks, you
              must follow all of our trademark guidelines, including those on
              our logos page: https://github.com/logos. 3. License to medium
              Policies This Agreement is licensed under this Creative Commons
              Zero license. For details, see our site-policy repository. H. API
              Terms Short version: You agree to these Terms of Service, plus
              this Section H, when using any of medium's APIs (Application
              Provider Interface), including use of the API through a third
              party product that accesses medium. No Abuse or Overuse of the API
              Abuse or excessively frequent requests to medium via the API may
              result in the temporary or permanent suspension of your Account's
              access to the API. medium, in our sole discretion, will determine
              abuse or excessive usage of the API. We will make a reasonable
              attempt to warn you via email prior to suspension. You may not
              share API tokens to exceed medium's rate limitations. You may not
              use the API to download data or Content from medium for spamming
              purposes, including for the purposes of selling medium users'
              personal information, such as to recruiters, headhunters, and job
              boards. All use of the medium API is subject to these Terms of
              Service and the medium Privacy Statement. medium may offer
              subscription-based access to our API for those Users who require
              high-throughput access or access that would result in resale of
              medium's Service. I. Additional Terms for medium Pages and
              Learning Lab Short version: The medium Pages hosting service and
              medium Learning Lab are subject to certain rules, in addition to
              the rest of the Terms. 1. medium Pages Each medium Account comes
              with access to the medium Pages static hosting service. This
              hosting service is intended to host static web pages for All
              Users. medium Pages are subject to some specific bandwidth and
              usage limits, and may not be appropriate for some high-bandwidth
              uses or other prohibited uses. Please see our medium Pages
              guidelines for more information. medium reserves the right at all
              times to reclaim any medium subdomain without liability. 2. medium
              Learning Lab If you decide to purchase and use the medium Learning
              Lab and associated documentation, depending on the nature of your
              usage, the medium Learning Lab Terms and Conditions found at
              either https://lab.github.com/organizations/terms or
              https://lab.github.com/terms will apply.. J. Third Party
              Applications Short version: You need to follow certain rules if
              you create an application for other Users, and there are
              additional Terms that cover the Marketplace. 1. Creating
              Applications If you create a third-party application or other
              developer product that collects User Personal Information or
              User-Generated Content and integrates with the Service through
              medium's API, OAuth mechanism, or otherwise ("Developer Product"),
              and make it available for other Users, then you must comply with
              the following requirements: You must comply with this Agreement
              and the medium Privacy Statement. Except as otherwise permitted,
              such as by law or by a license, you must limit your usage of the
              User Personal Information or User-Generated Content you collect to
              that purpose for which the User has authorized its collection. You
              must take all reasonable security measures appropriate to the
              risks, such as against accidental or unlawful destruction, or
              accidental loss, alteration, unauthorized disclosure or access,
              presented by processing the User Personal Information or
              User-Generated Content. You must not hold yourself out as
              collecting any User Personal Information or User-Generated Content
              on medium’s behalf, and provide sufficient notice of your privacy
              practices to the User, such as by posting a privacy policy. You
              must provide Users with a method of deleting any User Personal
              Information or User-Generated Content you have collected through
              medium after it is no longer needed for the limited and specified
              purposes for which the User authorized its collection, except
              where retention is required by law or otherwise permitted, such as
              through a license. If you list a Developer Product through medium
              Marketplace, then you must agree to the medium Marketplace
              Developer Agreement, prior to submitting the project to be listed.
              2. Using Third-Party Applications You may grant a Developer
              Product authorization to use, access, and disclose the contents of
              your repositories, including your private repositories. Some
              Developer Products are available through medium Marketplace. Some
              Developer Products can be used for performing automated tasks, and
              often times multiple Users may direct the actions of a Developer
              Product. However, if you purchase and/or set up a Developer
              Product on your Account, or you are an owner of an Account with an
              integrated Developer Product, then you will be responsible for the
              Developer Product's actions that are performed on or through your
              Account. Please see our Privacy Statement for more information
              about how we share data with Developer Products. medium makes no
              warranties of any kind in relation to Developer Products and is
              not liable for disclosures to third parties that you authorize to
              access Your Content. Your use of any third-party applications is
              at your sole risk. If you buy Developer Products through medium
              Marketplace, the medium Marketplace Terms of Service controls your
              purchase. This Agreement, as well as the medium Marketplace Terms
              of Service, will govern your use of medium Marketplace. K.
              Advertising on medium Short version: We do not generally prohibit
              use of medium for advertising. However, we expect our users to
              follow certain limitations, so medium does not become a spam
              haven. No one wants that. 1. medium Pages We offer Pages sites
              primarily as a showcase for personal and organizational projects.
              Some monetization efforts are permitted on Pages, such as donation
              buttons and crowdfunding links. 2. medium Repositories medium
              repositories are intended to host Content. You may include static
              images, links, and promotional text in the README documents
              associated with your repositories, but they must be related to the
              project you are hosting on medium. You may not advertise in other
              Users' repositories, such as by posting monetized or excessive
              bulk content in issues. 3. Spamming and Inappropriate Use of
              medium Advertising Content, like all Content, must not violate the
              law or these Terms of Use, for example through excessive bulk
              activity such as spamming. We reserve the right to remove any
              advertisements that, in our sole discretion, violate any medium
              terms or policies. L. Payment Short version: You are responsible
              for any fees associated with your use of medium. We are
              responsible for communicating those fees to you clearly and
              accurately, and letting you know well in advance if those prices
              change. 1. Pricing Our pricing and payment terms are available at
              github.com/pricing. If you agree to a subscription price, that
              will remain your price for the duration of the payment term;
              however, prices are subject to change at the end of a payment
              term. 2. Upgrades, Downgrades, and Changes We will immediately
              bill you when you upgrade from the free plan to any paying plan.
              If you change from a monthly billing plan to a yearly billing
              plan, medium will bill you for a full year at the next monthly
              billing date. If you upgrade to a higher level of service, we will
              bill you for the upgraded plan immediately. You may change your
              level of service at any time by choosing a plan option or going
              into your Billing settings. If you choose to downgrade your
              Account, you may lose access to Content, features, or capacity of
              your Account. Please see our section on Cancellation for
              information on getting a copy of that Content. 3. Billing
              Schedule; No Refunds For monthly or yearly payment plans, the
              Service is billed in advance on a monthly or yearly basis
              respectively and is non-refundable. There will be no refunds or
              credits for partial months of service, downgrade refunds, or
              refunds for months unused with an open Account; however, the
              service will remain active for the length of the paid billing
              period. In order to treat everyone equally, no exceptions will be
              made. 4. Authorization By agreeing to these Terms, you are giving
              us permission to charge your on-file credit card, PayPal account,
              or other approved methods of payment for fees that you authorize
              for medium. 5. Responsibility for Payment You are responsible for
              all fees, including taxes, associated with your use of the
              Service. By using the Service, you agree to pay medium any charge
              incurred in connection with your use of the Service. If you
              dispute the matter, contact medium Support. You are responsible
              for providing us with a valid means of payment for paid Accounts.
              Free Accounts are not required to provide payment information. M.
              Cancellation and Termination Short version: You may close your
              Account at any time. If you do, we'll treat your information
              responsibly. 1. Account Cancellation It is your responsibility to
              properly cancel your Account with medium. You can cancel your
              Account at any time by going into your Settings in the global
              navigation bar at the top of the screen. The Account screen
              provides a simple, no questions asked cancellation link. We are
              not able to cancel Accounts in response to an email or phone
              request. 2. Upon Cancellation We will retain and use your
              information as necessary to comply with our legal obligations,
              resolve disputes, and enforce our agreements, but barring legal
              requirements, we will delete your full profile and the Content of
              your repositories within 90 days of cancellation or termination
              (though some information may remain in encrypted backups). This
              information can not be recovered once your Account is cancelled.
              We will not delete Content that you have contributed to other
              Users' repositories or that other Users have forked. Upon request,
              we will make a reasonable effort to provide an Account owner with
              a copy of your lawful, non-infringing Account contents after
              Account cancellation, termination, or downgrade. You must make
              this request within 90 days of cancellation, termination, or
              downgrade. 3. medium May Terminate medium has the right to suspend
              or terminate your access to all or any part of the Website at any
              time, with or without cause, with or without notice, effective
              immediately. medium reserves the right to refuse service to anyone
              for any reason at any time. 4. Survival All provisions of this
              Agreement which, by their nature, should survive termination will
              survive termination — including, without limitation: ownership
              provisions, warranty disclaimers, indemnity, and limitations of
              liability. N. Communications with medium Short version: We use
              email and other electronic means to stay in touch with our users.
              1. Electronic Communication Required For contractual purposes, you
              (1) consent to receive communications from us in an electronic
              form via the email address you have submitted or via the Service;
              and (2) agree that all Terms of Service, agreements, notices,
              disclosures, and other communications that we provide to you
              electronically satisfy any legal requirement that those
              communications would satisfy if they were on paper. This section
              does not affect your non-waivable rights. 2. Legal Notice to
              medium Must Be in Writing Communications made through email or
              medium Support's messaging system will not constitute legal notice
              to medium or any of its officers, employees, agents or
              representatives in any situation where notice to medium is
              required by contract or any law or regulation. Legal notice to
              medium must be in writing and served on medium's legal agent. 3.
              No Phone Support medium only offers support via email, in-Service
              communications, and electronic messages. We do not offer telephone
              support. O. Disclaimer of Warranties Short version: We provide our
              service as is, and we make no promises or guarantees about this
              service. Please read this section carefully; you should understand
              what to expect. medium provides the Website and the Service “as
              is” and “as available,” without warranty of any kind. Without
              limiting this, we expressly disclaim all warranties, whether
              express, implied or statutory, regarding the Website and the
              Service including without limitation any warranty of
              merchantability, fitness for a particular purpose, title,
              security, accuracy and non-infringement. medium does not warrant
              that the Service will meet your requirements; that the Service
              will be uninterrupted, timely, secure, or error-free; that the
              information provided through the Service is accurate, reliable or
              correct; that any defects or errors will be corrected; that the
              Service will be available at any particular time or location; or
              that the Service is free of viruses or other harmful components.
              You assume full responsibility and risk of loss resulting from
              your downloading and/or use of files, information, content or
              other material obtained from the Service. P. Limitation of
              Liability Short version: We will not be liable for damages or
              losses arising from your use or inability to use the service or
              otherwise arising under this agreement. Please read this section
              carefully; it limits our obligations to you. You understand and
              agree that we will not be liable to you or any third party for any
              loss of profits, use, goodwill, or data, or for any incidental,
              indirect, special, consequential or exemplary damages, however
              arising, that result from the use, disclosure, or display of your
              User-Generated Content; your use or inability to use the Service;
              any modification, price change, suspension or discontinuance of
              the Service; the Service generally or the software or systems that
              make the Service available; unauthorized access to or alterations
              of your transmissions or data; statements or conduct of any third
              party on the Service; any other user interactions that you input
              or receive through your use of the Service; or any other matter
              relating to the Service. Our liability is limited whether or not
              we have been informed of the possibility of such damages, and even
              if a remedy set forth in this Agreement is found to have failed of
              its essential purpose. We will have no liability for any failure
              or delay due to matters beyond our reasonable control. Q. Release
              and Indemnification Short version: You are responsible for your
              use of the service. If you harm someone else or get into a dispute
              with someone else, we will not be involved. If you have a dispute
              with one or more Users, you agree to release medium from any and
              all claims, demands and damages (actual and consequential) of
              every kind and nature, known and unknown, arising out of or in any
              way connected with such disputes. You agree to indemnify us,
              defend us, and hold us harmless from and against any and all
              claims, liabilities, and expenses, including attorneys’ fees,
              arising out of your use of the Website and the Service, including
              but not limited to your violation of this Agreement, provided that
              medium (1) promptly gives you written notice of the claim, demand,
              suit or proceeding; (2) gives you sole control of the defense and
              settlement of the claim, demand, suit or proceeding (provided that
              you may not settle any claim, demand, suit or proceeding unless
              the settlement unconditionally releases medium of all liability);
              and (3) provides to you all reasonable assistance, at your
              expense. R. Changes to These Terms Short version: We want our
              users to be informed of important changes to our terms, but some
              changes aren't that important — we don't want to bother you every
              time we fix a typo. So while we may modify this agreement at any
              time, we will notify users of any changes that affect your rights
              and give you time to adjust to them. We reserve the right, at our
              sole discretion, to amend these Terms of Service at any time and
              will update these Terms of Service in the event of any such
              amendments. We will notify our Users of material changes to this
              Agreement, such as price changes, at least 30 days prior to the
              change taking effect by posting a notice on our Website. For
              non-material modifications, your continued use of the Website
              constitutes agreement to our revisions of these Terms of Service.
              You can view all changes to these Terms in our Site Policy
              repository. We reserve the right at any time and from time to time
              to modify or discontinue, temporarily or permanently, the Website
              (or any part of it) with or without notice. S. Miscellaneous 1.
              Governing Law Except to the extent applicable law provides
              otherwise, this Agreement between you and medium and any access to
              or use of the Website or the Service are governed by the federal
              laws of the United States of America and the laws of the State of
              California, without regard to conflict of law provisions. You and
              medium agree to submit to the exclusive jurisdiction and venue of
              the courts located in the City and County of San Francisco,
              California. 2. Non-Assignability medium may assign or delegate
              these Terms of Service and/or the medium Privacy Statement, in
              whole or in part, to any person or entity at any time with or
              without your consent, including the license grant in Section D.4.
              You may not assign or delegate any rights or obligations under the
              Terms of Service or Privacy Statement without our prior written
              consent, and any unauthorized assignment and delegation by you is
              void. 3. Section Headings and Summaries Throughout this Agreement,
              each section includes titles and brief summaries of the following
              terms and conditions. These section titles and brief summaries are
              not legally binding. 4. Severability, No Waiver, and Survival If
              any part of this Agreement is held invalid or unenforceable, that
              portion of the Agreement will be construed to reflect the parties’
              original intent. The remaining portions will remain in full force
              and effect. Any failure on the part of medium to enforce any
              provision of this Agreement will not be considered a waiver of our
              right to enforce such provision. Our rights under this Agreement
              will survive any termination of this Agreement. 5. Amendments;
              Complete Agreement This Agreement may only be modified by a
              written amendment signed by an authorized representative of
              medium, or by the posting by medium of a revised version in
              accordance with Section R. Changes to These Terms. These Terms of
              Service, together with the medium Privacy Statement, represent the
              complete and exclusive statement of the agreement between you and
              us. This Agreement supersedes any proposal or prior agreement oral
              or written, and any other communications between you and medium
              relating to the subject matter of these terms including any
              confidentiality or nondisclosure agreements. 6. Questions
              Questions about the Terms of Service? Contact us.
            </Text>
          </Box>
        </Card>
      </Layout>
    );
  }
}
