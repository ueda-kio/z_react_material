import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { Box, css, Modal, Typography } from '@mui/material';
import * as Button from '../Button';

export type MyDialogProps = {
	onClose: (value: string) => void;
	selectedNormalFair: string[];
};

const style = {
	modal: css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		padding: 40px;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
	`,
	title: css`
		font-weight: bold;
		font-size: 22px;
	`,
	list: css`
		margin-top: 4px;
		padding-left: 20px;
		list-style: circle;
	`,
	buttonWrapper: css`
		display: flex;
		justify-content: end;
		gap: 4px;
		margin-top: 20px;
	`,
};

const Confirm = (props: MyDialogProps) => {
	const { onClose, selectedNormalFair } = props;

	return (
		<Modal open onClose={() => onClose('close')}>
			<Box css={style.modal}>
				<em css={style.title}>ご注意ください</em>
				<Typography sx={{ mt: 4 }}>オンライン相談会で設定できないフェアコンテンツは削除されます。よろしいですか？</Typography>
				<Typography sx={{ mt: 4, fontSize: 14 }}>以下のコンテンツが削除されます</Typography>
				{selectedNormalFair.map((fair) => (
					<ul css={style.list}>
						<li key={fair}>{fair}</li>
					</ul>
				))}
				<Box css={style.buttonWrapper}>
					<Button.Secondary onClick={() => onClose('cancel')}>取り消す</Button.Secondary>
					<Button.Primary onClick={() => onClose('ok')}>続行</Button.Primary>
				</Box>
			</Box>
		</Modal>
	);
};

export default Confirm;
