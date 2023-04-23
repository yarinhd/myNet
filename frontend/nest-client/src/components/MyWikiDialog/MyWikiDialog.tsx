import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { MainLayout, TextInput, FinalizingButton } from './MyWikiDialog.style';
import { IMyWiki } from '../../common/interfaces/myWiki.interface';

interface IProps {
    finalButtonText: string;
    initialMyWiki?: IMyWiki;
    finalFunction: (myWiki: IMyWiki) => Promise<void>;
}

const MyWikiDialog: React.FC<IProps> = ({ finalButtonText, initialMyWiki, finalFunction }) => {
    const { t } = useTranslation();
    const [isSending, setIsSending] = useState<boolean>(false);
    const [myWiki, setMyWiki] = useState<IMyWiki>(initialMyWiki as IMyWiki);
    const [enable, setEnable] = useState<boolean>(false);

    useEffect(() => {
        setEnable(
            (myWiki.word !== initialMyWiki?.word || myWiki.defenition !== initialMyWiki?.defenition) &&
                !!myWiki.word &&
                !!myWiki.defenition
        );
    }, [myWiki]);

    const disableAndExecute = () => {
        if (!!myWiki.word && !!myWiki.defenition) {
            setIsSending(true);
            finalFunction(myWiki);
        }
    };

    return (
        <MainLayout>
            <Grid container rowGap={3} alignItems="center">
                <Grid xs={3}>
                    <Typography fontWeight="bold">{t('AMAN_WIKI.WIKI_NAME')}:</Typography>
                </Grid>
                <Grid xs={9}>
                    <TextInput
                        variant="outlined"
                        placeholder={t('AMAN_WIKI.ENTER_WIKI_NAME') || ''}
                        value={myWiki.word}
                        disabled={isSending}
                        onChange={(event) => {
                            setMyWiki({ ...myWiki, word: event.target.value });
                        }}
                    />
                </Grid>
                <Grid xs={3}>
                    <Typography fontWeight="bold">{t('AMAN_WIKI.EXPLANATION_AND_DETAIL')}:</Typography>
                </Grid>
                <Grid xs={9}>
                    <TextInput
                        sx={{ width: '70%' }}
                        variant="outlined"
                        placeholder={t('AMAN_WIKI.ENTER_EXPLANATION') || ''}
                        multiline
                        rows={3}
                        value={myWiki.defenition}
                        disabled={isSending}
                        onChange={(event) => {
                            setMyWiki({ ...myWiki, defenition: event.target.value });
                        }}
                    />
                </Grid>
            </Grid>
            <FinalizingButton disabled={!enable || isSending} onClick={disableAndExecute}>
                {finalButtonText}
            </FinalizingButton>
        </MainLayout>
    );
};

MyWikiDialog.defaultProps = {
    initialMyWiki: { word: '', defenition: '' },
};

export default MyWikiDialog;
