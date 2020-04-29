import { settingsKeys } from '../common/vars'

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
                    settingsKey={settingsKeys.ip}
                    label='Server IP Address:Port'
                    placeholder='192.168.86.246:8765'
                />
            </Section>
            <Section
                title={
                    <Text bold align='center'>
                        Wake-up Time
                    </Text>
                }
            >
                <TextInput
                    title='Wake-up hour (24h clock)'
                    settingsKey={settingsKeys.wakeHour}
                    label='Wake-up hour'
                    placeholder='5'
                />
                <TextInput
                    title='Wake-up minute'
                    settingsKey={settingsKeys.wakeMin}
                    label='Wake-up minute'
                    placeholder='0'
                />
            </Section>
        </Page>
    )
}

registerSettingsPage(mySettings)
