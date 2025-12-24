"use client";
import { Heading, Text, VStack } from "@chakra-ui/react";

export default function Terms() {
    return (
        <>
            <Heading>📜 Terms of Service</Heading>
            <Text>Effective Date: [12/15/2025] <br />Last Updated: [12/15/2025]</Text>

            <Heading>1. Acceptance of Terms</Heading>
            <Text>By accessing or using OpenDeveloperNetwork (ODN), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use the service.</Text >
            <Heading>2. Eligibility</Heading>
            <Text>You must be at least 13 years old(or the minimum age required in your jurisdiction) to use ODN.By using the service, you represent that you meet this requirement.</Text >

            <Heading>3. Use of the Service</Heading>
            <Text>You agree to use ODN only for lawful purposes.</Text>

            <Text>You may not:</Text>

            <Text>Upload or share harmful, abusive, or illegal content.</Text>
            <Text>Attempt to disrupt or interfere with the service.</Text>

            <Text>Misrepresent your identity or affiliation.</Text>

            <Heading>4. User Content</Heading>
            <Text>You retain ownership of any content you submit.</Text>

            <Text>By submitting content, you grant ODN a non - exclusive, worldwide license to display and distribute it within the service.</Text>

            <Text>You are responsible for ensuring your content complies with applicable laws.</Text>

            <Heading>5. Intellectual Property</Heading>
            <Text>All trademarks, logos, and software provided by ODN are the property of the ODN team.You may not copy, modify, or distribute them without permission.</Text>

            <Heading>6. Privacy</Heading>
            <Text>Your use of ODN is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.</Text>

            <Heading>7. Termination</Heading>
            <Text>We reserve the right to suspend or terminate your access to ODN at any time, without notice, if you violate these Terms.</Text>
            <Heading>8. Disclaimers</Heading>
            <Text>ODN is provided “as is” without warranties of any kind.We do not guarantee uninterrupted or error - free service.</Text>

            <Heading>9. Limitation of Liability</Heading>
            <Text>To the maximum extent permitted by law, ODN and its team are not liable for any damages arising from your use of the service.</Text>

            <Heading>10. Changes to Terms</Heading>
            <Text>We may update these Terms from time to time.Continued use of ODN after changes constitutes acceptance of the new Terms.</Text>

            <Heading>11. Analytics and Debugging</Heading>
            <Text>We use Microsoft Clarity to collect information about how users interact with OpenDeveloperNetwork(ODN).This includes anonymized usage data such as clicks, navigation patterns, and session replays.We use this information solely to improve functionality, identify bugs, and enhance user experience.Microsoft Clarity may collect data as described in the[Microsoft Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement). By using ODN, you consent to this data collection and analysis.</Text>


            {/* 11. Governing Law
        These Terms are governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in the courts of [Insert Location]. */}
        </>)
}