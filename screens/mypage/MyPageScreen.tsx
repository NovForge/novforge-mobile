import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MyPageCard, MyPageEditModal } from '../../components/mypage';
import { AuthSession, updateStoredSession } from '../../services/auth';
import { updateMyNickname, uploadMyProfileImage } from '../../services/users';
import { styles } from './MyPageScreen.styles';

type Props = { session: AuthSession | null; onSessionChange: (session: AuthSession) => void; onExit: () => void };
const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function MyPageScreen({ session, onSessionChange, onExit }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);

  const applyUser = async (user: AuthSession['user']) => {
    if (!session) return;
    const next = { ...session, user };
    await updateStoredSession(next);
    onSessionChange(next);
  };

  const openEdit = () => { if (session) { setNickname(session.user.userNickname); setEditError(null); setEditOpen(true); } };
  const closeEdit = () => { if (!saving) { setEditOpen(false); setEditError(null); } };

  const saveNickname = async () => {
    if (!session) return;
    const value = nickname.trim();
    if (!value) { setEditError('닉네임을 입력해 주세요.'); return; }
    setSaving(true); setEditError(null);
    try { await applyUser(await updateMyNickname(value, session.accessToken)); setEditOpen(false); }
    catch (cause) { setEditError(cause instanceof Error ? cause.message : '닉네임을 수정하지 못했습니다.'); }
    finally { setSaving(false); }
  };

  const selectAndUploadProfileImage = async () => {
    if (!session || profileUploading) return;
    setProfileError(null);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      if (result.canceled || !result.assets[0]) return;
      const asset = result.assets[0];
      if (asset.fileSize && asset.fileSize > MAX_PROFILE_IMAGE_SIZE) {
        setProfileError('프로필 사진은 5MB 이하여야 합니다.');
        return;
      }
      if (asset.mimeType && !ALLOWED_IMAGE_TYPES.includes(asset.mimeType)) {
        setProfileError('JPEG, PNG 또는 WebP 이미지만 사용할 수 있습니다.');
        return;
      }
      setProfileUploading(true);
      await applyUser(await uploadMyProfileImage(asset, session.accessToken));
    } catch (cause) {
      setProfileError(cause instanceof Error ? cause.message : '프로필 사진을 변경하지 못했습니다.');
    } finally { setProfileUploading(false); }
  };

  return <SafeAreaView style={styles.screen}>
    <MyPageCard session={session} profileUploading={profileUploading} profileError={profileError} onEdit={openEdit} onProfileImagePress={() => void selectAndUploadProfileImage()} onExit={onExit} />
    {session ? <MyPageEditModal visible={editOpen} user={session.user} nickname={nickname} error={editError} saving={saving} onNicknameChange={setNickname} onClose={closeEdit} onSave={() => void saveNickname()} /> : null}
  </SafeAreaView>;
}
