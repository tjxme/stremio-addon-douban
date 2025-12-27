import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Settings2 } from "lucide-react";
import { type FC, useState } from "react";
import type { ImageProvider } from "@/libs/config";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Item, ItemActions, ItemContent, ItemDescription, ItemSeparator, ItemTitle } from "../ui/item";
import { Switch } from "../ui/switch";
import type { ProviderConfig } from "./provider-configs";

interface SortableProviderItemProps {
  provider: ImageProvider;
  config: ProviderConfig;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  onExtraChange: (extra: ImageProvider["extra"]) => void;
  disabled?: boolean;
  showSeparator?: boolean;
}

export const SortableProviderItem: FC<SortableProviderItemProps> = ({
  provider,
  config,
  isEnabled,
  onToggle,
  onExtraChange,
  disabled,
  showSeparator,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: config.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      <div ref={setNodeRef} style={style}>
        <Item size="sm">
          <button
            type="button"
            className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="size-4" />
          </button>
          <ItemContent>
            <ItemTitle className={disabled && !isEnabled ? "text-muted-foreground" : undefined}>
              {config.name}
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            {/* 配置按钮 - 只有启用且有配置项时才显示 */}
            {isEnabled && config.renderConfig && (
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                  <button type="button" className="p-1 text-muted-foreground hover:text-foreground">
                    <Settings2 className="size-4" />
                  </button>
                </DrawerTrigger>
                <DrawerContent className="h-4/5">
                  <DrawerHeader>
                    <DrawerTitle>{config.name} 配置</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-6">
                    {config.renderConfig({
                      extra: provider.extra as never,
                      onChange: onExtraChange as never,
                    })}
                  </div>
                </DrawerContent>
              </Drawer>
            )}
            <Switch checked={isEnabled} disabled={disabled} onCheckedChange={onToggle} />
          </ItemActions>
        </Item>
      </div>
      {showSeparator && <ItemSeparator />}
    </>
  );
};
