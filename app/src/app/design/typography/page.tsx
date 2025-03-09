"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "@/components/ui/typography";
import { 
  Section, 
  Content, 
  Stack, 
  Inset, 
  Container 
} from "@/components/ui/spacing";
import { typography, spacing, lineHeight, fontWeight, letterSpacing } from "@/lib/typography";
import { componentStyles } from "@/lib/component-styles";

export default function TypographyDocPage() {
  return (
    <Container size="xl" className="py-8">
      <Heading1 className="mb-8">Typography & Spacing Documentation</Heading1>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="components">Component Styles</TabsTrigger>
          <TabsTrigger value="usage">Usage Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Section size="lg">
            <Card>
              <CardHeader>
                <CardTitle>Typography & Spacing System</CardTitle>
                <CardDescription>
                  A comprehensive system for consistent text styling and spacing throughout the application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Content size="md">
                  <Paragraph>
                    The Sneaker Collect Plus application uses a carefully designed typography and spacing system to ensure
                    consistent visual hierarchy, readability, and rhythm throughout the user interface.
                  </Paragraph>
                  
                  <Heading3 className="mt-6">Key Features</Heading3>
                  <List>
                    <li>Consistent type scale with clear hierarchy</li>
                    <li>Standardized spacing units for vertical and horizontal rhythm</li>
                    <li>Reusable components for common text patterns</li>
                    <li>Responsive design considerations built-in</li>
                    <li>Accessibility-focused with proper contrast and readability</li>
                  </List>
                  
                  <Heading3 className="mt-6">Implementation</Heading3>
                  <Paragraph>
                    The system is implemented through a combination of utility functions, component libraries, and
                    consistent application of styles. The core of the system is built on Tailwind CSS, with custom
                    components that encapsulate the styling rules.
                  </Paragraph>
                  
                  <Blockquote className="my-6">
                    Good typography isn't about choosing fancy fonts; it's about creating a clear visual hierarchy
                    that guides users through content effortlessly.
                  </Blockquote>
                  
                  <Paragraph>
                    Explore the tabs above to learn more about specific aspects of the typography and spacing system.
                  </Paragraph>
                </Content>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
        
        <TabsContent value="typography">
          <Section size="lg">
            <Card>
              <CardHeader>
                <CardTitle>Typography System</CardTitle>
                <CardDescription>
                  Text styles for various content types and hierarchies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Content size="md">
                  <Heading3>Headings</Heading3>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <Heading1>Heading 1</Heading1>
                      <Code className="mt-2 block text-xs">typography.h1: "{typography.h1}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Heading2>Heading 2</Heading2>
                      <Code className="mt-2 block text-xs">typography.h2: "{typography.h2}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Heading3>Heading 3</Heading3>
                      <Code className="mt-2 block text-xs">typography.h3: "{typography.h3}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Heading4>Heading 4</Heading4>
                      <Code className="mt-2 block text-xs">typography.h4: "{typography.h4}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Typography variant="h5">Heading 5</Typography>
                      <Code className="mt-2 block text-xs">typography.h5: "{typography.h5}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Typography variant="h6">Heading 6</Typography>
                      <Code className="mt-2 block text-xs">typography.h6: "{typography.h6}"</Code>
                    </div>
                  </div>
                  
                  <Heading3 className="mt-8">Body Text</Heading3>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <Paragraph>
                        This is a standard paragraph. It has good readability and is designed for the main content of your application.
                        The line height and spacing are optimized for comfortable reading.
                      </Paragraph>
                      <Code className="mt-2 block text-xs">typography.p: "{typography.p}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Lead>
                        This is a lead paragraph, used for introductions or to highlight important information.
                      </Lead>
                      <Code className="mt-2 block text-xs">typography.lead: "{typography.lead}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Large>This is large text, used for emphasis.</Large>
                      <Code className="mt-2 block text-xs">typography.large: "{typography.large}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Small>This is small text, used for captions or secondary information.</Small>
                      <Code className="mt-2 block text-xs">typography.small: "{typography.small}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Muted>This is muted text, used for less important information.</Muted>
                      <Code className="mt-2 block text-xs">typography.muted: "{typography.muted}"</Code>
                    </div>
                  </div>
                  
                  <Heading3 className="mt-8">Special Text Elements</Heading3>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <Blockquote>
                        This is a blockquote. It's used for quoting text from another source.
                        The styling makes it stand out from the rest of the content.
                      </Blockquote>
                      <Code className="mt-2 block text-xs">typography.blockquote: "{typography.blockquote}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div>
                        This is a sentence with <Code>inline code</Code> in it.
                      </div>
                      <Code className="mt-2 block text-xs">typography.code: "{typography.code}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <List>
                        <li>This is a list item</li>
                        <li>This is another list item</li>
                        <li>Lists are styled with proper spacing</li>
                      </List>
                      <Code className="mt-2 block text-xs">typography.list: "{typography.list}"</Code>
                    </div>
                  </div>
                </Content>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
        
        <TabsContent value="spacing">
          <Section size="lg">
            <Card>
              <CardHeader>
                <CardTitle>Spacing System</CardTitle>
                <CardDescription>
                  Consistent spacing units for layout and component spacing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Content size="md">
                  <Heading3>Section Spacing</Heading3>
                  <Paragraph className="mt-2">
                    Used for vertical spacing between major sections of a page.
                  </Paragraph>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <Section size="sm" className="border p-4 rounded-md">
                        <div className="bg-muted p-4 rounded">Section Item 1 (Small Spacing)</div>
                        <div className="bg-muted p-4 rounded">Section Item 2</div>
                        <div className="bg-muted p-4 rounded">Section Item 3</div>
                      </Section>
                      <Code className="mt-2 block text-xs">spacing.section.sm: "{spacing.section.sm}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Section size="md" className="border p-4 rounded-md">
                        <div className="bg-muted p-4 rounded">Section Item 1 (Medium Spacing)</div>
                        <div className="bg-muted p-4 rounded">Section Item 2</div>
                        <div className="bg-muted p-4 rounded">Section Item 3</div>
                      </Section>
                      <Code className="mt-2 block text-xs">spacing.section.md: "{spacing.section.md}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Section size="lg" className="border p-4 rounded-md">
                        <div className="bg-muted p-4 rounded">Section Item 1 (Large Spacing)</div>
                        <div className="bg-muted p-4 rounded">Section Item 2</div>
                        <div className="bg-muted p-4 rounded">Section Item 3</div>
                      </Section>
                      <Code className="mt-2 block text-xs">spacing.section.lg: "{spacing.section.lg}"</Code>
                    </div>
                  </div>
                  
                  <Heading3 className="mt-8">Content Spacing</Heading3>
                  <Paragraph className="mt-2">
                    Used for vertical spacing between content elements within a section.
                  </Paragraph>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <Content size="sm" className="border p-4 rounded-md">
                        <p className="bg-muted p-2 rounded">Content item 1</p>
                        <p className="bg-muted p-2 rounded">Content item 2</p>
                        <p className="bg-muted p-2 rounded">Content item 3</p>
                      </Content>
                      <Code className="mt-2 block text-xs">spacing.content.sm: "{spacing.content.sm}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Content size="md" className="border p-4 rounded-md">
                        <p className="bg-muted p-2 rounded">Content item 1</p>
                        <p className="bg-muted p-2 rounded">Content item 2</p>
                        <p className="bg-muted p-2 rounded">Content item 3</p>
                      </Content>
                      <Code className="mt-2 block text-xs">spacing.content.md: "{spacing.content.md}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Content size="lg" className="border p-4 rounded-md">
                        <p className="bg-muted p-2 rounded">Content item 1</p>
                        <p className="bg-muted p-2 rounded">Content item 2</p>
                        <p className="bg-muted p-2 rounded">Content item 3</p>
                      </Content>
                      <Code className="mt-2 block text-xs">spacing.content.lg: "{spacing.content.lg}"</Code>
                    </div>
                  </div>
                  
                  <Heading3 className="mt-8">Stack Spacing (Horizontal)</Heading3>
                  <Paragraph className="mt-2">
                    Used for horizontal spacing between elements in a row.
                  </Paragraph>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <Stack size="sm" className="border p-4 rounded-md">
                        <div className="bg-muted p-2 rounded">Item 1</div>
                        <div className="bg-muted p-2 rounded">Item 2</div>
                        <div className="bg-muted p-2 rounded">Item 3</div>
                      </Stack>
                      <Code className="mt-2 block text-xs">spacing.stack.sm: "{spacing.stack.sm}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Stack size="md" className="border p-4 rounded-md">
                        <div className="bg-muted p-2 rounded">Item 1</div>
                        <div className="bg-muted p-2 rounded">Item 2</div>
                        <div className="bg-muted p-2 rounded">Item 3</div>
                      </Stack>
                      <Code className="mt-2 block text-xs">spacing.stack.md: "{spacing.stack.md}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Stack size="lg" className="border p-4 rounded-md">
                        <div className="bg-muted p-2 rounded">Item 1</div>
                        <div className="bg-muted p-2 rounded">Item 2</div>
                        <div className="bg-muted p-2 rounded">Item 3</div>
                      </Stack>
                      <Code className="mt-2 block text-xs">spacing.stack.lg: "{spacing.stack.lg}"</Code>
                    </div>
                  </div>
                  
                  <Heading3 className="mt-8">Inset Padding</Heading3>
                  <Paragraph className="mt-2">
                    Used for padding within containers.
                  </Paragraph>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <Inset size="sm" className="border rounded-md bg-muted">
                        <p>Content with small padding</p>
                      </Inset>
                      <Code className="mt-2 block text-xs">spacing.inset.sm: "{spacing.inset.sm}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Inset size="md" className="border rounded-md bg-muted">
                        <p>Content with medium padding</p>
                      </Inset>
                      <Code className="mt-2 block text-xs">spacing.inset.md: "{spacing.inset.md}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Inset size="lg" className="border rounded-md bg-muted">
                        <p>Content with large padding</p>
                      </Inset>
                      <Code className="mt-2 block text-xs">spacing.inset.lg: "{spacing.inset.lg}"</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <Inset size="xl" className="border rounded-md bg-muted">
                        <p>Content with extra large padding</p>
                      </Inset>
                      <Code className="mt-2 block text-xs">spacing.inset.xl: "{spacing.inset.xl}"</Code>
                    </div>
                  </div>
                </Content>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
        
        <TabsContent value="components">
          <Section size="lg">
            <Card>
              <CardHeader>
                <CardTitle>Component Style Presets</CardTitle>
                <CardDescription>
                  Pre-defined style combinations for common UI patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Content size="md">
                  <Paragraph>
                    The component style presets provide consistent styling for common UI patterns.
                    These presets combine typography and spacing rules to create cohesive components.
                  </Paragraph>
                  
                  <Heading3 className="mt-6">Page Layouts</Heading3>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className={componentStyles.pageContainer + " border border-dashed border-muted h-40"}>
                        <div className="bg-muted p-2 rounded text-center">Page Container</div>
                      </div>
                      <Code className="mt-2 block text-xs">componentStyles.pageContainer</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className={componentStyles.pageHeader}>Page Header</div>
                      <Code className="mt-2 block text-xs">componentStyles.pageHeader</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className={componentStyles.sectionHeader}>Section Header</div>
                      <Code className="mt-2 block text-xs">componentStyles.sectionHeader</Code>
                    </div>
                  </div>
                  
                  <Heading3 className="mt-8">Form Elements</Heading3>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <label className={componentStyles.formLabel}>Form Label</label>
                      <input type="text" className={componentStyles.formInput} placeholder="Input field" />
                      <div className={componentStyles.formHelper}>Helper text for the input field</div>
                      <Code className="mt-2 block text-xs">componentStyles.formLabel, formInput, formHelper</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <label className={componentStyles.formLabel}>Form Label</label>
                      <input type="text" className={componentStyles.formInput} placeholder="Input with error" />
                      <div className={componentStyles.formError}>This field is required</div>
                      <Code className="mt-2 block text-xs">componentStyles.formError</Code>
                    </div>
                  </div>
                  
                  <Heading3 className="mt-8">Alerts and Notifications</Heading3>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className={componentStyles.alertSuccess}>
                        This is a success alert. It indicates that an operation completed successfully.
                      </div>
                      <Code className="mt-2 block text-xs">componentStyles.alertSuccess</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className={componentStyles.alertError}>
                        This is an error alert. It indicates that an operation failed.
                      </div>
                      <Code className="mt-2 block text-xs">componentStyles.alertError</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className={componentStyles.alertInfo}>
                        This is an info alert. It provides additional information to the user.
                      </div>
                      <Code className="mt-2 block text-xs">componentStyles.alertInfo</Code>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className={componentStyles.alertWarning}>
                        This is a warning alert. It indicates that the user should be cautious.
                      </div>
                      <Code className="mt-2 block text-xs">componentStyles.alertWarning</Code>
                    </div>
                  </div>
                </Content>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
        
        <TabsContent value="usage">
          <Section size="lg">
            <Card>
              <CardHeader>
                <CardTitle>Usage Guide</CardTitle>
                <CardDescription>
                  How to use the typography and spacing system in your components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Content size="md">
                  <Heading3>Using Typography Components</Heading3>
                  <Paragraph className="mt-2">
                    The typography components provide a simple way to apply consistent text styling.
                  </Paragraph>
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <Code className="block whitespace-pre text-xs">
{`import { Heading1, Paragraph, Muted } from "@/components/ui/typography";

export function MyComponent() {
  return (
    <div>
      <Heading1>Page Title</Heading1>
      <Paragraph>
        This is a paragraph with consistent styling.
      </Paragraph>
      <Muted>This is some secondary information.</Muted>
    </div>
  );
}`}
                    </Code>
                  </div>
                  
                  <Heading3 className="mt-8">Using Spacing Components</Heading3>
                  <Paragraph className="mt-2">
                    The spacing components provide consistent spacing for layout elements.
                  </Paragraph>
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <Code className="block whitespace-pre text-xs">
{`import { Section, Content, Stack } from "@/components/ui/spacing";

export function MyComponent() {
  return (
    <Section size="lg">
      <h2>Section Title</h2>
      <Content size="md">
        <p>First content item</p>
        <p>Second content item</p>
      </Content>
      <Stack size="md" className="mt-4">
        <button>Button 1</button>
        <button>Button 2</button>
      </Stack>
    </Section>
  );
}`}
                    </Code>
                  </div>
                  
                  <Heading3 className="mt-8">Using Component Style Presets</Heading3>
                  <Paragraph className="mt-2">
                    The component style presets provide consistent styling for common UI patterns.
                  </Paragraph>
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <Code className="block whitespace-pre text-xs">
{`import { componentStyles } from "@/lib/component-styles";

export function MyComponent() {
  return (
    <div className={componentStyles.pageContainer}>
      <h1 className={componentStyles.pageHeader}>Page Title</h1>
      <section>
        <h2 className={componentStyles.sectionHeader}>Section Title</h2>
        <form>
          <label className={componentStyles.formLabel}>
            Input Label
          </label>
          <input 
            type="text" 
            className={componentStyles.formInput} 
          />
          <div className={componentStyles.formHelper}>
            Helper text
          </div>
        </form>
      </section>
    </div>
  );
}`}
                    </Code>
                  </div>
                  
                  <Heading3 className="mt-8">Direct Usage of Typography and Spacing Utilities</Heading3>
                  <Paragraph className="mt-2">
                    You can also use the typography and spacing utilities directly with the <Code>cn</Code> function.
                  </Paragraph>
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <Code className="block whitespace-pre text-xs">
{`import { cn } from "@/lib/typography";
import { typography, spacing } from "@/lib/typography";

export function MyComponent() {
  return (
    <div className={cn(spacing.container.lg, "py-8")}>
      <h1 className={cn(typography.h1, "mb-8")}>
        Page Title
      </h1>
      <p className={cn(typography.p, "mb-4")}>
        This is a paragraph with custom margin.
      </p>
      <div className={cn(spacing.stack.md, "mt-6")}>
        <button>Button 1</button>
        <button>Button 2</button>
      </div>
    </div>
  );
}`}
                    </Code>
                  </div>
                </Content>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
      </Tabs>
    </Container>
  );
} 