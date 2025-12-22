"use client";
import { Heading, Text, VStack } from "@chakra-ui/react";


export default function Privacy() {
    return (
        <>
            <Heading>🔒 Privacy Policy</Heading>
            <Text>Effective Date: [12/15/2025] <br />Last Updated: [12/15/2025]</Text>

            <Heading>1. Information We Collect</Heading>
            <Text>When you use OpenDeveloperNetwork (ODN), we may collect:</Text>
            <Text>Account Information: Discord user ID, username, and profile details provided through the Discord SDK.</Text>

            <Text>Usage Data: Session activity, interactions, and participation metrics.</Text>

            <Text>Analytics Data: We use Microsoft Clarity to collect anonymized usage patterns (clicks, navigation, session replays) to identify bugs and improve functionality.</Text>

            <Text>Technical Data: Browser type, device information, and IP address for security and performance monitoring.</Text>

            <Heading>2. How We Use Your Information</Heading>
            <Text>We use collected data to:</Text>

            <Text>Provide and improve ODN’s features.</Text>

            <Text>Debug issues and ensure smooth functionality.</Text>
            <Text>Monitor usage patterns to enhance user experience.</Text>

            <Text>Maintain security and prevent misuse.</Text>

            <Heading>3. Sharing of Information</Heading>
            <Text>We do not sell or rent your personal information. We may share data:</Text>

            <Text>With trusted service providers (e.g., Microsoft Clarity) for analytics.</Text>

            <Text>If required by law or to protect the rights and safety of ODN and its users.</Text>

            <Heading>4. Data Security</Heading>
            <Text>We implement reasonable technical and organizational measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute protection.</Text>

            <Heading>5. Your Rights</Heading>
            <Text>Depending on your jurisdiction, you may have rights to:</Text>

            <Text>Access, correct, or delete your personal data.</Text>

            <Text>Opt out of analytics tracking.</Text>

            <Text>Withdraw consent for data collection.</Text>

            <Text>To exercise these rights, contact us at [Insert Contact Email].</Text>

            <Heading>6. Children’s Privacy</Heading>
            <Text>ODN is not intended for users under 13 (or the minimum age in your jurisdiction). We do not knowingly collect data from children.</Text>

            <Heading>7. Changes to This Policy</Heading>
            <Text>We may update this Privacy Policy from time to time. Continued use of ODN after changes constitutes acceptance of the updated policy.</Text>

            <Heading>8. Contact Us</Heading>
            <Text>If you have questions about this Privacy Policy, contact us at: Email: [Insert Contact Email] Team: OpenDeveloperNetwork (ODN)</Text>

            {/* 11. Governing Law
        These Terms are governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in the courts of [Insert Location]. */}
        </>)
}