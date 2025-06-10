import React from 'react';
import { PopupBackdrop, PopupContainer, PopupHeader, PopupItemList, PopupItem } from './ListPopup.styles';

interface ListPopupProps {
    title: string;
    items: any[];
    renderItem: (item: any) => React.ReactNode;
    onClose: () => void;  // 팝업 닫기 함수
    className?: string;
    hasSidebar: boolean;
    popupLeft?: number;
}

const ListPopup: React.FC<ListPopupProps> = ({ title, items, renderItem, onClose, className, hasSidebar, popupLeft }) => {
    return (
        <PopupBackdrop onClick={onClose}>
            <PopupContainer 
                $hasSidebar={hasSidebar} 
                $popupLeft={popupLeft}
                className={className} 
                onClick={(e) => e.stopPropagation()}>
                <PopupHeader>{title}</PopupHeader>
                <PopupItemList>
                    {items.map((item) => (
                        <PopupItem key={item.id}>{renderItem(item)}</PopupItem>
                    ))}
                </PopupItemList>
            </PopupContainer>
        </PopupBackdrop>
    );
};

export default ListPopup;