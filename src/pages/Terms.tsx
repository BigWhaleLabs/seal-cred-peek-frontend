import { BodyText, LinkText, SectionSubheader } from 'components/Text'
import { space } from 'classnames/tailwind'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'

export default function () {
  return (
    <div className={space('space-y-4')}>
      <PageTitle backButton title="Terms of Service" />
      <div className={space('space-y-4')}>
        <Section>
          <SectionSubheader>Terms</SectionSubheader>
          <BodyText>
            By accessing this Website, you are agreeing to be bound by these
            Website Terms and Conditions of Use and agree that you are
            responsible for the agreement with any applicable local laws. If you
            disagree with any of these terms, you are prohibited from accessing
            this site. The materials contained in this Website are protected by
            copyright and trade mark law.
          </BodyText>
        </Section>
        <Section>
          <SectionSubheader>Disclaimer</SectionSubheader>
          <BodyText>
            All the materials on Service’s Website are provided "as is". Service
            makes no warranties, may it be expressed or implied, therefore
            negates all other warranties. Furthermore, Service does not make any
            representations concerning the accuracy or reliability of the use of
            the materials on its Website or otherwise relating to such materials
            or any sites linked to this Website.
          </BodyText>
        </Section>
        <Section>
          <SectionSubheader>Limitations</SectionSubheader>
          <BodyText>
            Service or its suppliers will not be hold accountable for any
            damages that will arise with the use or inability to use the
            materials on Service’s Website, even if Service or an authorize
            representative of this Website has been notified, orally or written,
            of the possibility of such damage. Some jurisdiction does not allow
            limitations on implied warranties or limitations of liability for
            incidental damages, these limitations may not apply to you.
          </BodyText>
        </Section>
        <Section>
          <SectionSubheader>Revisions and Errata</SectionSubheader>
          <BodyText>
            The materials appearing on Service’s Website may include technical,
            typographical, or photographic errors. Service will not promise that
            any of the materials in this Website are accurate, complete, or
            current. Service may change the materials contained on its Website
            at any time without notice. Service does not make any commitment to
            update the materials.
          </BodyText>
        </Section>
        <Section>
          <SectionSubheader>Links</SectionSubheader>
          <BodyText>
            Service has not reviewed all of the sites linked to its Website and
            is not responsible for the contents of any such linked site. The
            presence of any link does not imply endorsement by Service of the
            site. The use of any linked website is at the user’s own risk.
          </BodyText>
        </Section>
        <Section>
          <SectionSubheader>Site Terms of Use Modifications</SectionSubheader>
          <BodyText>
            Service may revise these Terms of Use for its Website at any time
            without prior notice. By using this Website, you are agreeing to be
            bound by the current version of these Terms and Conditions of Use.
          </BodyText>
        </Section>
        <Section>
          <SectionSubheader>Your Privacy</SectionSubheader>
          <BodyText>
            Please read our{' '}
            <LinkText internal url="/privacy">
              Privacy Policy
            </LinkText>
            .
          </BodyText>
        </Section>
        <Section>
          <SectionSubheader>Governing Law</SectionSubheader>
          <BodyText>
            Any claim related to Service's Website shall be governed by the laws
            of ca without regards to its conflict of law provisions.
          </BodyText>
        </Section>
        <Section>
          <SectionSubheader>Encryption</SectionSubheader>
          <BodyText>
            In case if the user enables encryption, there is no way to decrypt
            the data without the password specified by the user.
          </BodyText>
        </Section>
      </div>
    </div>
  )
}
