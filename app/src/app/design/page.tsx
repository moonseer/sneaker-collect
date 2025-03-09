'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ColorPalette } from '@/components/ui/color-palette';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AnimatedCard, 
  AnimatedCardHeader, 
  AnimatedCardTitle, 
  AnimatedCardDescription, 
  AnimatedCardContent, 
  AnimatedCardFooter 
} from '@/components/ui/animated-card';
import { AnimatedContainer, AnimatedItem } from '@/components/ui/animated-container';
import {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
  Lead,
  Large,
  Small,
  Muted,
  Blockquote,
  Code,
  List
} from '@/components/ui/typography';
import {
  Spacing,
  Section,
  Content,
  Stack,
  Inset,
  Container
} from '@/components/ui/spacing';

export default function DesignSystemPage() {
  const [animationKey, setAnimationKey] = useState(0);
  
  // Function to trigger animations by changing the key
  const triggerAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  return (
    <Container size="xl" className="py-8">
      <Heading1 className="mb-8">Design System</Heading1>
      
      <Section size="lg">
        <Heading2 className="mb-6">Typography</Heading2>
        <Card>
          <CardHeader>
            <CardTitle>Headings</CardTitle>
            <CardDescription>
              Different heading styles for various content hierarchies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Content size="md">
              <Heading1>Heading 1</Heading1>
              <Heading2>Heading 2</Heading2>
              <Heading3>Heading 3</Heading3>
              <Heading4>Heading 4</Heading4>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
            </Content>
          </CardContent>
          
          <CardHeader className="border-t mt-6">
            <CardTitle>Body Text</CardTitle>
            <CardDescription>
              Different text styles for various content types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Content size="md">
              <Paragraph>
                This is a standard paragraph. It has good readability and is designed for the main content of your application.
                The line height and spacing are optimized for comfortable reading.
              </Paragraph>
              <Lead>
                This is a lead paragraph, used for introductions or to highlight important information.
              </Lead>
              <Large>This is large text, used for emphasis.</Large>
              <Small>This is small text, used for captions or secondary information.</Small>
              <Muted>This is muted text, used for less important information.</Muted>
            </Content>
          </CardContent>
          
          <CardHeader className="border-t mt-6">
            <CardTitle>Special Text Elements</CardTitle>
            <CardDescription>
              Special text elements for various content types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Content size="md">
              <Blockquote>
                This is a blockquote. It's used for quoting text from another source.
                The styling makes it stand out from the rest of the content.
              </Blockquote>
              <div>
                This is a sentence with <Code>inline code</Code> in it.
              </div>
              <List>
                <li>This is a list item</li>
                <li>This is another list item</li>
                <li>Lists are styled with proper spacing</li>
              </List>
            </Content>
          </CardContent>
        </Card>
      </Section>
      
      <Section size="lg">
        <Heading2 className="mb-6">Spacing</Heading2>
        <Card>
          <CardHeader>
            <CardTitle>Section Spacing</CardTitle>
            <CardDescription>
              Different section spacing sizes for vertical rhythm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Section size="sm" className="border p-4 rounded-md">
              <div className="bg-muted p-4 rounded">Section Item 1 (Small Spacing)</div>
              <div className="bg-muted p-4 rounded">Section Item 2</div>
              <div className="bg-muted p-4 rounded">Section Item 3</div>
            </Section>
            
            <div className="mt-8">
              <Heading4 className="mb-2">Medium Spacing (Default)</Heading4>
              <Section size="md" className="border p-4 rounded-md">
                <div className="bg-muted p-4 rounded">Section Item 1 (Medium Spacing)</div>
                <div className="bg-muted p-4 rounded">Section Item 2</div>
                <div className="bg-muted p-4 rounded">Section Item 3</div>
              </Section>
            </div>
            
            <div className="mt-8">
              <Heading4 className="mb-2">Large Spacing</Heading4>
              <Section size="lg" className="border p-4 rounded-md">
                <div className="bg-muted p-4 rounded">Section Item 1 (Large Spacing)</div>
                <div className="bg-muted p-4 rounded">Section Item 2</div>
                <div className="bg-muted p-4 rounded">Section Item 3</div>
              </Section>
            </div>
          </CardContent>
          
          <CardHeader className="border-t mt-6">
            <CardTitle>Content Spacing</CardTitle>
            <CardDescription>
              Different content spacing sizes for text and elements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Small Content Spacing</CardTitle>
                </CardHeader>
                <CardContent>
                  <Content size="sm" className="border p-4 rounded-md">
                    <p className="bg-muted p-2 rounded">Content item 1</p>
                    <p className="bg-muted p-2 rounded">Content item 2</p>
                    <p className="bg-muted p-2 rounded">Content item 3</p>
                  </Content>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medium Content Spacing</CardTitle>
                </CardHeader>
                <CardContent>
                  <Content size="md" className="border p-4 rounded-md">
                    <p className="bg-muted p-2 rounded">Content item 1</p>
                    <p className="bg-muted p-2 rounded">Content item 2</p>
                    <p className="bg-muted p-2 rounded">Content item 3</p>
                  </Content>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Large Content Spacing</CardTitle>
                </CardHeader>
                <CardContent>
                  <Content size="lg" className="border p-4 rounded-md">
                    <p className="bg-muted p-2 rounded">Content item 1</p>
                    <p className="bg-muted p-2 rounded">Content item 2</p>
                    <p className="bg-muted p-2 rounded">Content item 3</p>
                  </Content>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          
          <CardHeader className="border-t mt-6">
            <CardTitle>Stack Spacing (Horizontal)</CardTitle>
            <CardDescription>
              Different stack spacing sizes for horizontal layouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Heading4 className="mb-2">Small Stack</Heading4>
                <Stack size="sm" className="border p-4 rounded-md">
                  <div className="bg-muted p-2 rounded">Item 1</div>
                  <div className="bg-muted p-2 rounded">Item 2</div>
                  <div className="bg-muted p-2 rounded">Item 3</div>
                </Stack>
              </div>
              
              <div>
                <Heading4 className="mb-2">Medium Stack</Heading4>
                <Stack size="md" className="border p-4 rounded-md">
                  <div className="bg-muted p-2 rounded">Item 1</div>
                  <div className="bg-muted p-2 rounded">Item 2</div>
                  <div className="bg-muted p-2 rounded">Item 3</div>
                </Stack>
              </div>
              
              <div>
                <Heading4 className="mb-2">Large Stack</Heading4>
                <Stack size="lg" className="border p-4 rounded-md">
                  <div className="bg-muted p-2 rounded">Item 1</div>
                  <div className="bg-muted p-2 rounded">Item 2</div>
                  <div className="bg-muted p-2 rounded">Item 3</div>
                </Stack>
              </div>
            </div>
          </CardContent>
          
          <CardHeader className="border-t mt-6">
            <CardTitle>Inset Padding</CardTitle>
            <CardDescription>
              Different inset padding sizes for containers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Heading4 className="mb-2">Small Inset</Heading4>
                <Inset size="sm" className="border rounded-md bg-muted">
                  <p>Content with small padding</p>
                </Inset>
              </div>
              
              <div>
                <Heading4 className="mb-2">Medium Inset</Heading4>
                <Inset size="md" className="border rounded-md bg-muted">
                  <p>Content with medium padding</p>
                </Inset>
              </div>
              
              <div>
                <Heading4 className="mb-2">Large Inset</Heading4>
                <Inset size="lg" className="border rounded-md bg-muted">
                  <p>Content with large padding</p>
                </Inset>
              </div>
              
              <div>
                <Heading4 className="mb-2">Extra Large Inset</Heading4>
                <Inset size="xl" className="border rounded-md bg-muted">
                  <p>Content with extra large padding</p>
                </Inset>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
      
      <Section size="lg">
        <Heading2 className="mb-6">Color Palette</Heading2>
        <Card>
          <CardContent className="pt-6">
            <ColorPalette />
          </CardContent>
        </Card>
      </Section>
      
      <Section size="lg">
        <Heading2 className="mb-6">Buttons</Heading2>
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>
              Different button styles for various actions and contexts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stack size="md" className="flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="accent">Accent</Button>
            </Stack>
          </CardContent>
          <CardHeader className="border-t mt-6">
            <CardTitle>Button Sizes</CardTitle>
            <CardDescription>
              Different button sizes for various contexts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stack size="md" className="flex-wrap items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Section>
      
      <Section size="lg">
        <Heading2 className="mb-6">Animated Buttons</Heading2>
        <Card>
          <CardHeader>
            <CardTitle>Animated Button Variants</CardTitle>
            <CardDescription>
              Buttons with hover, tap, and presence animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stack size="md" className="flex-wrap">
              <AnimatedButton variant="default">Default</AnimatedButton>
              <AnimatedButton variant="secondary">Secondary</AnimatedButton>
              <AnimatedButton variant="outline">Outline</AnimatedButton>
              <AnimatedButton variant="ghost">Ghost</AnimatedButton>
              <AnimatedButton variant="destructive">Destructive</AnimatedButton>
              <AnimatedButton variant="success">Success</AnimatedButton>
              <AnimatedButton variant="warning">Warning</AnimatedButton>
              <AnimatedButton variant="accent">Accent</AnimatedButton>
            </Stack>
          </CardContent>
          <CardHeader className="border-t mt-6">
            <CardTitle>Animation Options</CardTitle>
            <CardDescription>
              Different animation combinations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stack size="md" className="flex-wrap">
              <AnimatedButton 
                variant="default" 
                animateOnHover={true} 
                animateOnTap={false} 
                animatePresence={false}
              >
                Hover Only
              </AnimatedButton>
              <AnimatedButton 
                variant="default" 
                animateOnHover={false} 
                animateOnTap={true} 
                animatePresence={false}
              >
                Tap Only
              </AnimatedButton>
              <AnimatedButton 
                variant="default" 
                animateOnHover={false} 
                animateOnTap={false} 
                animatePresence={true}
              >
                Presence Only
              </AnimatedButton>
              <AnimatedButton 
                variant="default" 
                animateOnHover={true} 
                animateOnTap={true} 
                animatePresence={true}
              >
                All Animations
              </AnimatedButton>
            </Stack>
          </CardContent>
        </Card>
      </Section>
      
      <Section size="lg">
        <Heading2 className="mb-6">Cards</Heading2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <Paragraph>This is the main content of the card.</Paragraph>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle>Primary Card</CardTitle>
              <CardDescription className="text-primary-foreground/80">With primary header</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Paragraph>Card with a primary colored header.</Paragraph>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Action</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-accent">
            <CardHeader>
              <CardTitle className="text-accent">Accent Card</CardTitle>
              <CardDescription>With accent border</CardDescription>
            </CardHeader>
            <CardContent>
              <Paragraph>Card with an accent colored border.</Paragraph>
            </CardContent>
            <CardFooter>
              <Button variant="accent" className="w-full">Accent Action</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>
      
      <Section size="lg">
        <Heading2 className="mb-6">Animated Cards</Heading2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedCard key={`card1-${animationKey}`} hover="scale">
            <AnimatedCardHeader>
              <AnimatedCardTitle>Scale on Hover</AnimatedCardTitle>
              <AnimatedCardDescription>This card scales up on hover</AnimatedCardDescription>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <Paragraph>Hover over this card to see the scale animation.</Paragraph>
            </AnimatedCardContent>
            <AnimatedCardFooter>
              <AnimatedButton className="w-full">Action</AnimatedButton>
            </AnimatedCardFooter>
          </AnimatedCard>
          
          <AnimatedCard key={`card2-${animationKey}`} hover="elevate">
            <AnimatedCardHeader>
              <AnimatedCardTitle>Elevate on Hover</AnimatedCardTitle>
              <AnimatedCardDescription>This card elevates on hover</AnimatedCardDescription>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <Paragraph>Hover over this card to see the elevation animation.</Paragraph>
            </AnimatedCardContent>
            <AnimatedCardFooter>
              <AnimatedButton className="w-full">Action</AnimatedButton>
            </AnimatedCardFooter>
          </AnimatedCard>
          
          <AnimatedCard key={`card3-${animationKey}`} className="border-accent">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="text-accent">Staggered Animation</AnimatedCardTitle>
              <AnimatedCardDescription>With staggered children</AnimatedCardDescription>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <Paragraph>Notice how each element animates in sequence.</Paragraph>
            </AnimatedCardContent>
            <AnimatedCardFooter>
              <AnimatedButton variant="accent" className="w-full">Accent Action</AnimatedButton>
            </AnimatedCardFooter>
          </AnimatedCard>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={triggerAnimation}>Replay Animations</Button>
        </div>
      </Section>
      
      <Section size="lg">
        <Heading2 className="mb-6">Staggered List Animation</Heading2>
        <Card>
          <CardHeader>
            <CardTitle>Staggered List Items</CardTitle>
            <CardDescription>
              Items animate in sequence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatedContainer key={`list-${animationKey}`} animation="stagger">
              <AnimatedItem>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <Paragraph>First item to animate</Paragraph>
                  </CardContent>
                </Card>
              </AnimatedItem>
              <AnimatedItem delay={0.1}>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <Paragraph>Second item with slight delay</Paragraph>
                  </CardContent>
                </Card>
              </AnimatedItem>
              <AnimatedItem delay={0.2}>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <Paragraph>Third item with more delay</Paragraph>
                  </CardContent>
                </Card>
              </AnimatedItem>
              <AnimatedItem delay={0.3}>
                <Card>
                  <CardContent className="p-4">
                    <Paragraph>Fourth item with even more delay</Paragraph>
                  </CardContent>
                </Card>
              </AnimatedItem>
            </AnimatedContainer>
            <div className="mt-4 flex justify-center">
              <Button onClick={triggerAnimation}>Replay Animations</Button>
            </div>
          </CardContent>
        </Card>
      </Section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Animation Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedContainer key={`fade-${animationKey}`} animation="fade" className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Fade Animation</h3>
            <p className="mb-4">Simple fade in/out animation.</p>
            <AnimatedButton>Action</AnimatedButton>
          </AnimatedContainer>
          
          <AnimatedContainer key={`slide-${animationKey}`} animation="slide" className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Slide Animation</h3>
            <p className="mb-4">Slide up with spring physics.</p>
            <AnimatedButton>Action</AnimatedButton>
          </AnimatedContainer>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={triggerAnimation}>Replay Animations</Button>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Theme Toggle</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Toggle between light and dark mode to see how the colors and animations adapt.</p>
            <div className="flex items-center space-x-2">
              <AnimatedButton 
                variant="outline" 
                className="w-32"
                onClick={() => document.documentElement.classList.remove('dark')}
              >
                Light Mode
              </AnimatedButton>
              <AnimatedButton 
                variant="outline" 
                className="w-32"
                onClick={() => document.documentElement.classList.add('dark')}
              >
                Dark Mode
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>
      </section>
    </Container>
  );
} 