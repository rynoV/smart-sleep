function mySettings(props) {
    return (
        <Page>
            <Section
                title={
                    <Text bold align='center'>
                        Server Config
                    </Text>
                }
            >
                <TextInput
                    title='Set IP'
                    settingsKey='ipAddress'
                    label='Server IP Address:Port'
                    placeholder='IP for Server:Port number'
                />
            </Section>
        </Page>
    )
}

registerSettingsPage(mySettings)
