import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { scroller } from "react-scroll";

import { getPlotPrice } from "@/aaLogic/getPlotPrice";
import { PageLayout } from "@/components/layout/page-layout";
import { toLocalString } from "@/lib";
import { useAaParams } from "@/store/aa-store";
import { useSettingsStore } from "@/store/settings-store";

import { FaqContent, FaqItem, FaqTitle } from "./components";

export default () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height || 0;
      window.scrollTo(0, 0);
      scroller.scrollTo(hash, {
        smooth: true,
        offset: -headerHeight,
        duration: 500,
        spy: true,
        hashSpy: true,
      });
    }
  }, [location.key, location.hash]);

  const { symbol } = useSettingsStore((state) => state);
  const params = useAaParams();
  const { matching_probability, referral_boost, followup_reward_share, p2p_sale_fee, shortcode_sale_fee } = params;
  const { fee } = getPlotPrice(params);

  return (
    <PageLayout
      title="F.A.Q."
      ogImageKey="faq"
      seoTitle="Frequently asked questions"
      seoDescription="Frequently asked questions about Obyte City, a community engagement space for Obyte"
    >
      <div className="max-w-5xl prose prose-xl">
        <div className="space-y-16 sm:grid sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
          <FaqItem>
            <FaqTitle scrollId="what-is-obyte-city">What is Obyte City?</FaqTitle>
            <FaqContent scrollId="what-is-obyte-city">
              <p>
                Obyte City is a community space for Obyte. Here, Obyte community members can establish closer
                connections with each other, while having their own place in the city and potentially making money in{" "}
                {symbol} tokens.
              </p>
              <p>
                Anyone can own a plot of land in the City. When buying a plot, it gets random coordinates, and if it
                happens to be a neighbor of another plot, both owners get:
              </p>
              <ul>
                <li>houses on their plots;</li>
                <li>
                  two new plots for each owner at new random locations. The owners can leave the new plots and get{" "}
                  {` ${symbol} `}
                  tokens (worth two plots) in exchange, or wait for a new neighbor to appear.
                </li>
              </ul>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="what-am-i-supposed-to-do-here">What am I supposed to do here?</FaqTitle>
            <FaqContent scrollId="what-am-i-supposed-to-do-here">
              <p>
                First, you buy a plot of land for 1000 {` ${symbol} `} plus a fee (see below). Initially, it is an empty
                plot without a house.{" "}
              </p>
              <p>In a few minutes after you buy a new plot, it gets assigned random coordinates in the City.</p>
              <p>
                If it happens to be close enough to another empty plot, both you and your new neighbor get rewards (see
                below how to claim them):
              </p>
              <ul>
                <li>houses on your and your neighbor’s plots, turning your unbuilt plots into built ones;</li>
                <li>two new empty plots for you and two new empty plots for your neighbor at new random locations.</li>
              </ul>

              <p>Those new plots can happen to be neighbors of someone else and trigger another round of rewards.</p>
              <p>
                For every unbuilt plot you own, you can leave it at any time and get 1000 {` ${symbol} `} (or whatever
                the plot price was) back. This applies to both the plots you bought and those you received as rewards.
              </p>
              <p>
                If your newly bought plot immediately becomes a neighbor of another plot, you make a profit thanks to
                the reward plots. Otherwise, your plot remains in the City and can become a neighbor with some new plot
                later, triggering the same rewards for you and your new neighbor. If you don’t want to wait, you can
                leave the plot and take your 1000 {` ${symbol} `} back, but you’ll lose the fee paid when buying the
                plot. The fee is burned and reduces the total supply of {` ${symbol} `}.
              </p>
              <p>While your plot is still unbuilt, you can also sell or transfer it to anyone.</p>
              <p>
                Once a house is built on your plot, there are no {` ${symbol} `} tokens associated with it anymore. You
                get two new plots instead, each valued at 1000 {` ${symbol} `}. The house has no monetary value, cannot
                be sold or transferred, and this place in the City is forever yours.
              </p>
              <p>
                Once you have a house, you can assign a unique shortcode to it. Shortcodes are given on a first come,
                first served basis, and are available only to house owners, one shortcode per house. You can sell your
                shortcode to another house owner. Shortcodes are likely to be used in the future versions of Obyte
                wallet to send tokens between users. So, when someone wants to send you tokens, they can send them to
                @shortcode instead of your (not-so-friendly-looking) address.
              </p>
              <p>
                You can customize your house or plot by assigning it a name and linking to your twitter, linkedin,
                telegram, instagram, and various other social profiles. It’s your place in the City.
              </p>
              <p>You can have as many plots and houses as you like.</p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="whats-the-purpose-of-obyte-city">What’s the purpose of Obyte City?</FaqTitle>
            <FaqContent scrollId="whats-the-purpose-of-obyte-city">
              <p>
                The purpose is to encourage{" "}
                <a target="_blank" href="https://obyte.org/" rel="noopener">
                  Obyte
                </a>{" "}
                community members to create closer connections with each other when they become neighbors in the City
                and claim their reward plots and houses. We believe this makes our community stronger.
              </p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="how-close-do-two-plots-need-to-be-to-become-neighbors">
              How close do two plots need to be to become neighbors?
            </FaqTitle>
            <FaqContent scrollId="how-close-do-two-plots-need-to-be-to-become-neighbors">
              <p>
                Every plot has its coordinates in the City and an amount that was paid to buy the plot. Both horizontal
                and vertical coordinates range from 0 to 1,000,000. Then, we draw a square area around the plot, with
                the plot in its center and the square’s area proportional to the amount paid for the plot. This area is
                called the matching area. The total area assigned to all plots is 10% of the City’s area. When a new
                plot is bought, it gets random coordinates in the City, and if these coordinates fall within any
                existing plot’s matching area, these two plots are deemed neighbors.
              </p>
              <p>
                For example, if there is only one plot, its matching area would be a square with side length equal to
                316,228 points (so that its area is 316,228^2 = 100,000,000,000, which is 10% of the total City’s area
                1,000,000,000,000). If there are 10 plots with equal amounts paid to buy them, each plot’s square has
                side length 100,000.
              </p>
              <p>
                As more plots are bought in the City, each plot’s matching area decreases, and so decreases the
                probability that the next new plot will be its neighbor. On the other hand, the frequency of new plot
                purchases likely increases at the same time, so the opportunities to get a neighbor become more
                frequent.
              </p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="how-likely-is-it-that-my-new-plot-immediately-gets-a-neighbor">
              How likely is it that my new plot immediately gets a neighbor?
            </FaqTitle>
            <FaqContent scrollId="how-likely-is-it-that-my-new-plot-immediately-gets-a-neighbor">
              <p>
                It is currently {toLocalString((matching_probability * 100).toFixed(2))}%, and this number can be
                changed by <Link to="/governance">governance</Link>.
              </p>
              <p>
                If you don’t get a neighbor immediately, every new plot that others buy is a potential neighbor for you.
                In case you don’t want to wait, you can leave your plot and get the plot price back (but the fee is not
                returned), then try again.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="are-tokens-locked-in-plots">Are {` ${symbol} `} tokens locked in plots?</FaqTitle>
            <FaqContent scrollId="are-tokens-locked-in-plots">
              <p>No, you can take them back at any time.</p>
              <p>
                However, in this case you lose the fee you paid when buying the plot – if this is a plot you bought.
                There are no losses for plots you got as a reward after becoming a neighbor with someone.
              </p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="what-are-these-green-rectangles-on-the-city-map">
              What are these green rectangles on the City map?
            </FaqTitle>
            <FaqContent scrollId="what-are-these-green-rectangles-on-the-city-map">
              <p>
                They are the matching areas of the plots at the center of the rectangle. If a new plot’s coordinates
                fall within this rectangle, they become neighbors. Neighbors can claim rewards: houses on their plots
                and two new empty plots.
              </p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="why-did-the-green-rectangle-around-my-plot-become-smaller-than-it-was-a-month-ago">
              Why did the green rectangle around my plot become smaller than it was a month ago?
            </FaqTitle>
            <FaqContent scrollId="why-did-the-green-rectangle-around-my-plot-become-smaller-than-it-was-a-month-ago">
              <p>
                Because new plots were bought in the City and the area of each plot was decreased so that their total
                area is still 10% of the City area.
              </p>
              <p>
                That’s not necessarily bad news as the frequency of new plot purchases might have also grown, which
                means more opportunities to get a neighbor.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="what-is-the-fee-when-buying-a-plot">What is the fee when buying a plot?</FaqTitle>
            <FaqContent scrollId="what-is-the-fee-when-buying-a-plot">
              <p>
                The current fee is {toLocalString((fee * 100).toFixed(2))}%. It depends on the matching probability
                (currently, 10%) and on the referral boost (currently,{" "}
                {toLocalString((referral_boost * 100).toFixed(2))}%), which are both set by{" "}
                <Link to="/governance">governance</Link>. The fee is burned and decreases the total supply of{" "}
                {` ${symbol} `}. Its size is to make sure that the same amount of {` ${symbol} `} is burned (on average)
                to the fee as the {` ${symbol} `} minted with reward plots paid to neighbors.
              </p>
              <p>The formula, if you are interested, is</p>

              <p className="text-lg">
                <span className="mr-2 italic font-semibold">fee&nbsp;=</span>

                <span className="inline-flex flex-col items-center align-middle">
                  <span>
                    2&nbsp;&times;&nbsp;(1&nbsp;+&nbsp;
                    <span className="italic">referral_boost</span>) &nbsp;&times;&nbsp;
                    <span className="italic">matching_probability</span>
                  </span>

                  <span className="w-full border-t border-current my-0.5"></span>

                  <span>
                    1&nbsp;&minus;&nbsp;4&nbsp;&times;&nbsp;
                    <span className="italic">matching_probability</span>
                  </span>
                </span>
              </p>
              <p>
                The denominator in this formula accounts for the fact that the 4 reward plots can become neighbors with
                some other plots, thus triggering more rewards and potentially more new neighbors, and so on. This
                becomes especially likely with higher matching probabilities.
              </p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="how-can-i-make-money-in-the-city">How can I make money in the City?</FaqTitle>
            <FaqContent scrollId="how-can-i-make-money-in-the-city">
              <ol>
                <li>By finding neighbors and receiving reward plots, which double your investment.</li>
                <li>
                  By referring users to the City and having an increased likelihood of getting them as neighbors when
                  they buy plots with your referral code (see below).
                </li>
                <li>
                  By registering shortcodes and later selling them to other users. Shortcodes are available only to
                  house owners.
                </li>
              </ol>
              <p>
                While engaging in these activities, you are holding {` ${symbol} `} tokens which could appreciate as new
                users buy them and due to deflationary burning of tokens when users pay fees.
              </p>
              <p>
                Of course, there are no guarantees, and your outcomes might vary depending both on your own actions and
                on how the market develops.
              </p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="can-I-earn-by-referring-users-to-the-city">
              Can I earn by referring users to the City?
            </FaqTitle>
            <FaqContent scrollId="can-I-earn-by-referring-users-to-the-city">
              <p>
                Yes, you can. When users buy a plot from your plot or house page on city.obyte.org, you become their
                referrer, and there is an increased likelihood that they’ll become your neighbor.
              </p>
              <p>
                Your plot’s matching area then increases by {toLocalString((referral_boost * 100).toFixed(2))}% of the
                total matching area of all plots (not {toLocalString((referral_boost * 100).toFixed(2))}% of your plot’s
                area). This makes it slightly (by {toLocalString((referral_boost * 100).toFixed(2))}%) more likely that
                the new user finds a neighbor, thus benefiting them too, and if they do find a neighbor, it is far more
                likely that it will be you. This {toLocalString((referral_boost * 100).toFixed(2))}% variable is called
                referral boost and can be changed by <Link to="/governance">governance</Link>.
              </p>
              <p>You can put a link to one of your plots on your social profiles to drive referral traffic.</p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="how-can-I-be-sure-the-rules-are-actually-whats-described-here">
              How can I be sure the rules are actually what’s described here, can’t be changed, and my money can’t be
              stolen?
            </FaqTitle>
            <FaqContent scrollId="how-can-I-be-sure-the-rules-are-actually-whats-described-here">
              <p>
                The rules are implemented by{" "}
                <a href="https://obyte.org/platform/autonomous-agents" target="_blank" rel="noopener">
                  Autonomous Agents (AAs)
                </a>
                , which are soulless code-driven actors on <a href="https://obyte.org/">Obyte DAG</a>. Nobody can
                intervene with their operation, nobody can tell them what to do, nobody can take their money, and nobody
                can change their code. Even the Obyte team, which created them. Their code is{" "}
                <a href="https://github.com/byteball/city-aa" target="_blank" rel="noopener">
                  available on github
                </a>{" "}
                , so anyone can see what rules the agents actually follow and compare with what we describe here.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="how-can-I-get-a-neighbor-faster">How can I get a neighbor faster?</FaqTitle>
            <FaqContent scrollId="how-can-I-get-a-neighbor-faster">
              <ol>
                <li>
                  Buy more plots. Every time you buy a plot, you have a{" "}
                  {toLocalString((matching_probability * 100).toFixed(2))}% chance to immediately find a neighbor. For
                  your plots that did not immediately find a neighbor, the more such plots you own, the larger share of
                  the City’s land is yours, the larger the probability that another user’s new plot appears within one
                  of your plots.
                </li>
                <li>
                  Leave your plot (and get its money back) if it didn’t find any neighbor, and try again. However note
                  that you lose the fee you paid when buying the plot.
                </li>
                <li>
                  Rent additional land around your plot. This temporarily, for 1 year, extends the matching area around
                  your plot and increases the probability that a new plot gets into this area and becomes your neighbor.
                  So, you are casting a wider net to catch incoming new plots. The rental fee that you pay is burned and
                  decreases the total supply of {` ${symbol} `}.
                </li>
                <li>
                  Use someone’s referral link to buy plots. This increases the probability of finding a neighbor by{" "}
                  {toLocalString((referral_boost * 100).toFixed(2))}%.
                </li>
                <li>
                  Encourage other, old and new, users to use your referral link. This adds{" "}
                  {toLocalString((matching_probability * 100).toFixed(2))}% of the total occupied area to the matching
                  area of one of your plots.
                </li>
              </ol>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="how-do-I-claim-rewards-when-my-plot-becomes-a-neighbor">
              How do I claim rewards when my plot becomes a neighbor with someone?
            </FaqTitle>
            <FaqContent scrollId="how-do-I-claim-rewards-when-my-plot-becomes-a-neighbor">
              <p>
                When you become a neighbor with someone, you both get notified via telegram and/or discord depending on
                what accounts you linked to your Obyte address.
              </p>
              <p>
                Then, you should connect with your neighbor via direct messages on telegram or discord. If you block
                direct messages from strangers, please allow DMs from the neighbor’s username (e.g. by adding them to
                friends on discord) or contact them first.
              </p>
              <p>
                Once you are in a chat with the neighbor, agree with them about the time when you both will be able to
                send claiming requests from your Obyte wallets. To send your claiming request, you need to click a link
                on the claiming page linked in the discord/telegram notification. Your and your neighbor’s claims must
                be sent within 10 minutes of each other. They can be sent at any time after the notification, you don’t
                need to rush to your wallet immediately after receiving the notification. The only requirement is that
                no more than 10 minutes should pass between your and your neighbor’s claims. It doesn’t matter who
                claims first. If the second claim comes too late, no issues, you can try as many times as necessary.
              </p>
              <p>
                After your claims succeed, you receive a house on your plot and two new empty plots, each worth the same
                amount as your old plot, and your neighbor gets a similar reward.
              </p>
              <p>
                If you like, you can use this chat as an opportunity to learn more about the fellow community member,
                who is now your neighbor in the City.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="why-do-the-rewards-need-to-be-claimed-and-are-not-just-paid-automatically">
              Why do the rewards need to be claimed and are not just paid automatically?
            </FaqTitle>
            <FaqContent scrollId="why-do-the-rewards-need-to-be-claimed-and-are-not-just-paid-automatically">
              <p>
                They could be paid automatically, there is no technical reason why they couldn’t. If the purpose were
                just to get the rewards into one’s bag and go away, then all this chat and claiming “dance” would indeed
                be unnecessary friction. In that case, automatic payouts would make the most sense.
              </p>
              <p>
                However, the City’s purpose is to help community members establish more, and stronger ties with each
                other. We believe that such horizontal connections, and a dense network of them, make our community
                stronger, more cooperative, more capable of effective collective action, more resilient, and more
                independent of the team — who, otherwise, would be a central point of failure. Whether this approach
                will work, we don’t know, but we are happy to try.
              </p>
              <p>
                With this purpose in mind, the moment when two community members become neighbors is a perfect
                opportunity for them to get to know each other, successfully solve a small problem together, and anchor
                this experience to the act of receiving rewards.
              </p>
              <p>
                To make sure this new connection is not forgotten, we also refresh it with follow-up rewards some time
                after the initial connection.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="what-are-follow-up-rewards">What are follow-up rewards?</FaqTitle>
            <FaqContent scrollId="what-are-follow-up-rewards">
              <p>
                Follow-up rewards are {toLocalString((followup_reward_share * 100).toFixed(2))}% of the plot price and
                are paid to both neighbors some time after they become neighbors.
              </p>
              <p>
                The first follow-up reward becomes available 60 days after the two users become neighbors. The second
                follow-up reward is paid in 90 days after the first, the third — in 120 days after the second, and so on
                (see the full schedule in the{" "}
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/byteball/city-aa/blob/main/city.oscript#L115"
                >
                  source code of the City AA
                </a>
                ).
              </p>
              <p>Follow-up rewards must be claimed in the same way as the initial rewards after becoming neighbors.</p>
              <p>
                They are available for claiming within 10 days after becoming available. If not claimed within this
                timeframe, the reward is lost, however the future follow-up rewards are not affected. You will receive
                notifications in our discord and telegram groups whenever follow-up rewards become available, you don’t
                need to mark your calendar.
              </p>
              <p>
                Follow-up rewards are paid to user balances which cannot be withdrawn but can be used to buy new plots
                once the balance accumulates the sufficient amount (having many plots helps to make this balance
                spendable faster).
              </p>
              <p>
                Claiming follow-up rewards gives the neighbors an opportunity to renew their connection, and over time,
                this connection becomes stronger.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="why-is-it-required-to-link-my-account-to-discord-or-telegram">
              Why is it required to link my account to discord or telegram?
            </FaqTitle>
            <FaqContent scrollId="why-is-it-required-to-link-my-account-to-discord-or-telegram">
              <p>
                By attesting your discord and telegram accounts you link them to your Obyte address, which is your only
                identifier in the City. Having that link allows us to notify you when you get a neighbor and become
                eligible for the reward house and plots, as well as when follow-up rewards become available, so that you
                and your neighbor won’t miss them.
              </p>
              <p>
                It is recommended to link both discord and telegram to be able to connect on the platform that is most
                convenient to both you and your future neighbors.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="how-is-the-plot-price-determined">How is the plot price determined?</FaqTitle>
            <FaqContent scrollId="how-is-the-plot-price-determined">
              <p>
                The initial price is 1000 {` ${symbol} `} and it can be changed by{" "}
                <Link to="/governance">governance</Link>.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="is-it-a-game">Is it a game?</FaqTitle>
            <FaqContent scrollId="is-it-a-game">
              <p>
                City has some similarities with games but we (the developers) prefer not to present it as a game as
                people have certain expectations about games that City doesn’t attempt to meet. While there are some
                game-like elements such as a small “virtual world” (but nowhere near as complex as in some games), some
                outcomes determined by chance, and simple strategies you can pursue, we see City primarily as a
                community engagement tool.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="what-is-the-initial-supply-of-tokens">
              What is the initial supply of {` ${symbol} `} tokens?
            </FaqTitle>
            <FaqContent scrollId="what-is-the-initial-supply-of-tokens">
              <p>
                The initial supply is 0. Tokens are minted at a fixed price 1000 {` ${symbol} `} for 1 GBYTE during the
                initial sale period, and then they are burned and minted in response to user actions, with burns most
                likely exceeding emissions.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="when-are-tokens-minted-and-burned">
              When are {` ${symbol} `} tokens minted and burned? Are they inflationary or deflationary?
            </FaqTitle>
            <FaqContent scrollId="when-are-tokens-minted-and-burned">
              <p>
                Mints:
                <ol>
                  <li>Reward plots.</li>
                  <li>Follow-up rewards.</li>
                  <li>
                    {` ${symbol} `} bought during the initial sale period at the fixed rate 1 GBYTE = 1000{" "}
                    {` ${symbol} `}.
                  </li>
                </ol>
              </p>
              <p>
                Burns:
                <ol>
                  <li>
                    Fee paid when buying a plot. It is designed to fully offset the inflation from the reward plots.
                  </li>
                  <li>
                    Rental fee. It is designed to fully offset the inflation from the increased matching probability and
                    the additionally minted reward plots.
                  </li>
                  <li>{toLocalString((p2p_sale_fee * 100).toFixed(2))}% fee on P2P sales of plots.</li>
                  <li>{toLocalString((shortcode_sale_fee * 100).toFixed(2))}% fee on P2P sales of shortcodes.</li>
                </ol>
              </p>

              <p>
                Depending on the balance between mints and burns, {` ${symbol} `} can be inflationary or deflationary.
              </p>

              <p>
                The only inflationary factor that is not guaranteed to be fully offset by fees is follow-up rewards.
                However, they are paid out slowly over time and become spendable only once a minimum balance equal to
                plot price plus fee is accumulated.
              </p>

              <p>
                On the other hand, the fees are set for the worst case (worst for the {` ${symbol} `} supply) when all
                users keep their plots until matching with a neighbor. Which also means {` ${symbol} `} tokens are bound
                in plots and kept out of free circulation. Whenever a user leaves a plot, they abandon the opportunity
                to receive reward plots while not returning the fee they paid for this opportunity. If this happens
                often enough, it offsets the inflation from the follow-up rewards and makes the token deflationary.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="what-is-the-initial-sale-period">What is the initial sale period?</FaqTitle>
            <FaqContent scrollId="what-is-the-initial-sale-period">
              <p>
                It’s an initial period when {` ${symbol} `} tokens can be bought at a fixed rate 1 GBYTE = 1000{" "}
                {` ${symbol} `}. During this period, {` ${symbol} `} tokens are minted. Thereafter, they can only be
                bought from other users or earned as rewards.
              </p>
              <p>
                To buy {` ${symbol} `} tokens during the initial sale period one needs to buy a plot. Plots are paid in
                GBYTE instead of {` ${symbol} `} during this period, and the price in GBYTE is determined using the
                fixed exchange rate 1 GBYTE = 1000 {` ${symbol} `}. When paying for a plot, you add 10% of the plot
                price (in GBYTE) and receive {` ${symbol} `}
                tokens in exchange, along with the plot. So, you’ll need to buy $100 worth of plots in order to buy $10
                worth of {` ${symbol} `}.
              </p>

              <p>
                If you leave this plot (before or after the initial sale ends), you get the plot price in{" "}
                {` ${symbol} `}.
              </p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="what-will-happen-to-the-money-raised-in-the-initial-sale">
              What will happen to the money raised in the initial sale?
            </FaqTitle>
            <FaqContent scrollId="what-will-happen-to-the-money-raised-in-the-initial-sale">
              <p>
                The GBYTEs paid for plots and {` ${symbol} `} tokens during the initial sale will be withdrawn by the{" "}
                <a href="https://obyte.org/" target="_blank" rel="noopener">
                  Obyte
                </a>{" "}
                team and used to fund development of community engagement tools (including City), other dapps, and Obyte
                platform itself. Although City AA is immutable and can’t be developed any further, we can still work on
                improvements of user interfaces, analytic tools, and integrations.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="who-are-these-people-the-citys-streets-and-avenues-are-named-after">
              Who are these people the City’s streets and avenues are named after?
            </FaqTitle>
            <FaqContent scrollId="who-are-these-people-the-citys-streets-and-avenues-are-named-after">
              <p>
                They are cypherpunks.{" "}
                <a href="https://obyte.org/" target="_blank" rel="noopener">
                  Obyte
                </a>{" "}
                has its roots in the cypherpunk movement and its aspiration to use cryptography to protect personal
                freedoms and privacy. That’s why Obyte City is cypherpunk themed.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="how-do-plots-and-houses-get-their-addresses-and-coordinates">
              How do plots and houses get their addresses and coordinates?
            </FaqTitle>
            <FaqContent scrollId="how-do-plots-and-houses-get-their-addresses-and-coordinates">
              <p>
                First, there are special, mayor-owned houses named after some famous cypherpunks. They are not earned
                like normal houses but created by the City’s mayor (who can be replaced by{" "}
                <Link to="/governance">governance</Link>) at random coordinates.
              </p>
              <p>
                Next, there are streets running east-west and avenues running north-south through each of the cypherpunk
                houses. So, for example, Satoshi house lies at the intersection of Satoshi street and Satoshi avenue.
              </p>
              <p>
                Then, when a new plot is bought, it gets random coordinates that look like (123456, 789012) where the
                first number is its horizontal (east-west) position and the second number is its vertical (north-south)
                position. Both positions are numbers between 0 and 1000000.
              </p>
              <p>A house has the same coordinates as the plot it is built upon.</p>
              <p>
                To get a street address of a plot or house, we find the closest street or avenue, its coordinate along
                this street or avenue, and an offset in the perpendicular direction. For example, a plot at (123456,
                789012) might have an address like “Satoshi street, 123456/N555” where N stands for North, meaning 555
                points to the North from Satoshi street, 123456.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="who-is-the-mayor">Who is the mayor?</FaqTitle>
            <FaqContent scrollId="who-is-the-mayor">
              <p>
                The mayor’s job is to create special houses to have a street/avenue grid in the City. The streets and
                avenues go through these special mayor-managed houses and are named after them. The mayor can edit the
                information about these houses, e.g. to add links to articles about the person or thing the house is
                named after. Mayor houses cannot have shortcodes.
              </p>
              <p>The mayor doesn’t have any other power over the City.</p>
              <p>
                Obyte founder is the initial mayor of the City, and the mayor can be changed by{" "}
                <Link to="/governance">governance</Link>.
              </p>
            </FaqContent>
          </FaqItem>
          <FaqItem>
            <FaqTitle scrollId="what-happens-if-plot-price-is-changed-by-governance-and-then-a-new-plot-bought-for-the-new-price">
              What happens if plot price is changed by governance and then a new plot bought for the new price becomes a
              neighbor of an old plot bought for an old price?
            </FaqTitle>
            <FaqContent scrollId="what-happens-if-plot-price-is-changed-by-governance-and-then-a-new-plot-bought-for-the-new-price">
              <p>
                In this case, the reward plots are worth the price of the smaller plot. Also, while both plots get a
                house, the bigger empty plot still stays there but with the amount equal to the difference of the
                amounts of the two plots. This downsized plot can later become a neighbor with someone else and a second
                house will be built at the same coordinates as the first house.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="what-happens-if-a-new-plot-becomes-a-neighbor-of-two-or-more-other-plots-at-the-same-time">
              What happens if a new plot becomes a neighbor of two or more other plots at the same time?
            </FaqTitle>
            <FaqContent scrollId="what-happens-if-a-new-plot-becomes-a-neighbor-of-two-or-more-other-plots-at-the-same-time">
              <p>
                In this case, the new plot can pair and claim rewards with any of the two eligible neighbors. Once
                claimed, the other neighboring plot is not eligible any more as it has no neighboring empty plot any
                longer.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="what-if-my-two-plots-happen-to-be-close-to-each-other">
              What if my two plots happen to be close to each other?
            </FaqTitle>
            <FaqContent scrollId="what-if-my-two-plots-happen-to-be-close-to-each-other">
              <p>
                They are not considered neighbors. Only neighboring plots owned by different people are eligible for
                rewards.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="what-are-shortcodes">What are shortcodes?</FaqTitle>
            <FaqContent scrollId="what-are-shortcodes">
              <p>
                Shortcodes are unique names assigned to houses. They are like domain names and are given out on a first
                come, first served basis. Only house owners can have shortcodes, one shortcode per house (except mayor
                houses).
              </p>
              <p>
                In a future release of Obyte wallet it is likely that City shortcodes will work as aliases for the house
                owner address (or any other address the owner wishes to assign to their shortcode), so that anyone will
                be able to send any tokens to @shortcode instead of a regular Obyte address.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="how-can-i-be-sure-that-the-coordinates-of-a-newly-bought-plot-are-really-random-and-cant-be-manipulated-by-anyone">How can I be sure that the coordinates of a newly bought plot are really random and can’t be manipulated by anyone?</FaqTitle>
            <FaqContent scrollId="how-can-i-be-sure-that-the-coordinates-of-a-newly-bought-plot-are-really-random-and-cant-be-manipulated-by-anyone">
              <p>
                The coordinates are not actually random but they are unpredictable and impossible to manipulate — that’s what we actually need. They are generated by VRF (verifiable random function) oracles.
              </p>
              <p>
                A VRF oracle generates a number based on an input (which is a plot number) and the oracle’s private key.
                Anyone can verify the oracle’s output using their public key.
              </p>

              <p>
                Since nobody, except the oracle, knows their private key, they cannot predict the coordinates and cannot
                know whether the next plot will be a neighbor of anyone. The oracle however can predict its own output, but
                cannot manipulate it.
              </p>

              <p>
                If there is only one oracle, it has to be trusted that the oracle operator doesn’t abuse their knowledge
                of the future oracle’s outputs to buy plots only when they know they would get a neighbor.
              </p>

              <p>
                Any setup with two or more (non-colluding) oracles is secure as their outputs are combined to generate
                the new plot coordinates, and since each oracle operator cannot predict the outputs of all the other
                ones, he or she cannot predict the coordinates.
              </p>

              <p>
                The combination of VRF oracles used by the City is managed by <Link to="/governance">governance</Link>,
                so it is up to the community to ensure that plot coordinates are generated based on a sufficient number
                of independent VRF oracles.
              </p>

              <p>
                The initial VRF oracles are operated by:
                <ol>
                  <li>Tony Churyumoff: Obyte founder,</li>
                  <li>Fabien: the initial developer of Oswap DEX, developer of obyte.js library, and operator of one of Order Provider nodes,</li>
                  <li>@obytegermany: a long-time community member and the author of byte-news.de community blog.</li>
                </ol>
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="how-does-governance-work">How does governance work?</FaqTitle>
            <FaqContent scrollId="how-does-governance-work">
              <p>
                There are several parameters that can be changed by <Link to="/governance">governance</Link>, such as
                plot price, the probability of finding a neighbor when buying a new plot, referral boost, and randomness
                oracles. Owners of empty plots, who are the stakeholders in the City, vote for changing these
                parameters. Their vote weight is equal to the amount in {` ${symbol} `} they hold in unbuilt plots
                (houses don’t have any tokens associated with them).
              </p>

              <p>
                Anyone can suggest a new value for a parameter and anyone else can vote to support it or vote for some
                other value (e.g. for the current value if they want to keep it unchanged). There is no quorum
                requirement. A new parameter value can be committed and become active if it has the most votes and
                remains unchallenged for 3 days — this is based on the assumption that non-voters are okay with the
                change. If a different proposed value gains more votes, the countdown resets.
              </p>

              <p>
                Discord notifications are sent for new votes to ensure that community members don't miss any proposed
                changes.
              </p>
            </FaqContent>
          </FaqItem>

          <FaqItem>
            <FaqTitle scrollId="who-develops-and-supports-obyte-city">Who develops and supports Obyte City?</FaqTitle>
            <FaqContent scrollId="who-develops-and-supports-obyte-city">
              <p>
                The{" "}
                <a href="https://obyte.org/" target="_blank" rel="noopener">
                  Obyte
                </a>{" "}
                team has developed the{" "}
                <a href="https://github.com/byteball/city-aa" target="_blank" rel="noopener">
                  City AA
                </a>
                , which is what handles tokens, plots, houses, mints, burns, and the governance framework. After that,
                the team doesn’t operate the AA — it’s an autonomous agent, and the team has no power over it. Neither
                can it change the AA — it’s set in stone and nothing can be changed except a few parameters manageable
                by the community <Link to="/governance">governance</Link>.
              </p>

              <p>
                The Obyte team has also developed and continues to support all the infrastructure around the AA, such as
                user interface and integrations with messaging platforms. Independent developers are welcome to
                contribute to these parts of the ecosystem and develop their own.
              </p>
            </FaqContent>
          </FaqItem>
        </div>
      </div>

      <div className="mt-8">
        Any other questions? Ask on{" "}
        <a href="https://discord.obyte.org/" target="_blank" rel="noopener" className="text-blue-400">
          Discord
        </a>.
      </div>
    </PageLayout>
  );
};

