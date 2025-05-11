import appConfig from "@/appConfig";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BuyNewPlotForm } from "@/forms/BuyNewPlotForm";
import { toLocalString } from "@/lib";
import { useAaParams } from "@/store/aa-store";
import { useSettingsStore } from "@/store/settings-store";

export const BuyNewPlotCard = () => {
  const { decimals, symbol } = useSettingsStore((state) => state);

  const { plot_price } = useAaParams();

  const plotPrice = Number(plot_price) / 10 ** (decimals ?? 0);

  return (
    <Card highlight>
      <CardHeader>
        <CardTitle>Buy a new plot</CardTitle>
        <CardDescription>
          It will be created at a random location. If it becomes a neighbor of another plot, you receive 2 new plots
          worth {toLocalString(plotPrice)} {symbol} each. You also get introduced to the neighbor and receive a house on
          your plot.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <BuyNewPlotForm />
      </CardContent>

      <CardFooter className="block text-xs text-muted-foreground">
        Before buying, you need to link your Obyte address to your{" "}
        <a href={appConfig.DISCORD_BOT_URL} className="text-link">
          discord
        </a>{" "}
        and/or
        <a href={appConfig.TELEGRAM_BOT_URL} className="text-link">
          {" "}
          telegram
        </a>{" "}
        usernames. This is necessary to notify you when you get a neighbor and become eligible for rewards.
      </CardFooter>
    </Card>
  );
};

