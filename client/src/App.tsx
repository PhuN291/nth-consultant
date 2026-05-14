import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Home from "@/pages/Home";
import ServiceDetail from "@/pages/ServiceDetail";
import AdminLogin from "@/pages/admin/Login";
import AdminBlogList from "@/pages/admin/BlogList";
import BlogForm from "@/pages/admin/BlogForm";
import AdminContactList from "@/pages/admin/ContactList";
import { PrivacyPolicy, TermsOfService } from "@/pages/LegalPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tin-tuc" component={Blog} />
      <Route path="/tin-tuc/:slug" component={BlogPost} />
      <Route path="/dich-vu/:slug" component={ServiceDetail} />
      <Route path="/chinh-sach-bao-mat" component={PrivacyPolicy} />
      <Route path="/dieu-khoan-su-dung" component={TermsOfService} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/blog" component={AdminBlogList} />
      <Route path="/admin/blog/new" component={BlogForm} />
      <Route path="/admin/blog/:id/edit" component={BlogForm} />
      <Route path="/admin/lien-he" component={AdminContactList} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
